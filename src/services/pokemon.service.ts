import { Pokemon } from "../models/pokemon.model";
import { IPokemon } from "../interfaces/pokemon.interface";
import { Page } from "../models/page.model";
import axios from "axios";

export class PokemonService {

  public async findPokeAPIPokemon(quantity: any, offset: any) {
    const response = await axios.get('https://pokeapi.co/api/v2/pokemon', {
      params: {
        limit: quantity,
        offset: offset
      }
    });
    return response?.data;
  }

  public async findFavorites(): Promise<any> {
    let favorites = await Pokemon.find().exec();
    let favoritesIds: Number[] = [];
    favorites.forEach((favorite) => {
      favoritesIds.push(parseInt(favorite.id));
    });
    return {
      favorites,
      favoritesIds
    }
  }

  public async findPokemonDetails(pokemons: any) {
    await Promise.all(pokemons.map(async (pokemon: any) => {
      const contents = await axios.get(pokemon.url);
      pokemon.detail = contents?.data;
      // Set ability string
      if (pokemon?.detail.abilities) {
        if (pokemon?.detail.abilities.length > 1) {
          pokemon.detail.abilities.forEach((ability: any) => {
            if (!ability.is_hidden) {
              if (pokemon?.detail?.ability_concat) {
                pokemon.detail.ability_concat = pokemon?.detail?.ability_concat + ", " + ability.ability?.name;
              } else {
                pokemon.detail.ability_concat = ability.ability?.name;
              }
            }
          })
        }
      }
    }));
    return pokemons;
  }

  public async returnRange(highRange: number, lowRange: number) {
    return Array.apply(0, Array(highRange)).map((element, index) => (index + 1) + lowRange);
  }

  public async getAverages(pokemons: any, favorites: number) {
    let avgHeightFavorites = 0;
    let avgWeightFavorites = 0;
    let avgHeight = avgHeightFavorites;
    let avgWeight = avgWeightFavorites;
    pokemons.forEach((pokemon: any) => {
      if (pokemon.favorite) {
        avgHeightFavorites += pokemon?.detail?.height;
        avgWeightFavorites += pokemon?.detail?.weight;
      }
      avgHeight += pokemon?.detail?.height;
      avgWeight += pokemon?.detail?.weight;
    });
    avgHeightFavorites = avgHeightFavorites / favorites;
    avgWeightFavorites = avgWeightFavorites / favorites;
    avgHeight = avgHeight / pokemons.length;
    avgWeight = avgWeight / pokemons.length;
    return {
      avgHeightFavorites,
      avgWeightFavorites,
      avgHeight,
      avgWeight
    };
  }

  public async findAll(quantity: any, pageFront: any): Promise<any> {
    try {

      quantity = parseInt(quantity);
      pageFront = parseInt(pageFront);

      let { favorites, favoritesIds } = await this.findFavorites();

      let pages: Page[];
      pages = [];

      let { results, count } = await this.findPokeAPIPokemon(2000, 0);

      const totalPages = Math.ceil(count / quantity);

      [...Array(totalPages).keys()].forEach((page) => {
        pages.push({
          page: page + 1,
          endsFavorites: false,
          hasFavorites: false,
          favoritesEndOn: 0,
          highRange: 0,
          lowRange: 0,
          pokemons: [],
          pokemonsCount: 0
        });
      });

      let favoritesAlive = true;
      pages.forEach(async (page: any, index: any) => {
        if (favoritesAlive) {

          if ((quantity * page.page) > favorites.length && (quantity * (page.page - 1)) <= favorites.length) {

            favoritesAlive = false;
            page.endsFavorites = true;
            page.lowRange = 0;
            page.highRange = (quantity * page.page) - favorites.length;

            page.pokemons = favorites.slice((page.page * quantity) - quantity, favorites.length - ((page.page * quantity) - quantity));

            results.forEach((pokemon: any, index: any) => {
              const segments = pokemon?.url.split("/");
              const pokemonId = parseInt(segments[segments.length - 2]);
              if (favoritesIds.includes(pokemonId)) {
                results.splice(index, 1);
              }
            });

            page.pokemons = [
              ...page.pokemons,
              ...results.slice(page.lowRange, page.highRange)
            ]
            page.pokemonsCount = page.pokemons.length;

          } else {
            page.pokemons = favorites.slice((page.page * quantity) - quantity, (page.page * quantity));
          }
        } else {
          if (pages[index - 1]) {
            page.lowRange = pages[index - 1].highRange;
            page.highRange = page.lowRange + quantity;
            page.pokemons = [
              ...page.pokemons,
              ...results.slice(page.lowRange, page.highRange)
            ]
            page.pokemonsCount = page.pokemons.length;
          }
        }
      });

      pages[pageFront - 1].pokemons = await this.findPokemonDetails(pages[pageFront - 1]?.pokemons);

      const { avgHeight, avgWeight } = await this.getAverages(
        pages[pageFront - 1].pokemons,
        favorites.length
      );

      return {
        count,
        pokemons: pages[pageFront - 1].pokemons,
        avgHeight,
        avgWeight
      };

    } catch (error) {
      throw error;
    }
  }

  public findTest = () => {
    return Pokemon.
      find().exec();
  }

  public findByID(id: string): any {
    return Pokemon.find({ id: id }).exec();
  }

  public addFavorite(record: IPokemon): Promise<IPokemon> {
    const newRecord = new Pokemon(record);
    return newRecord.save();
  }

  public async getFavoriteData(): Promise<any> {
    let { favorites } = await this.findFavorites();
    favorites = await this.findPokemonDetails(favorites);
    const { avgHeightFavorites, avgWeightFavorites } = await this.getAverages(
      favorites,
      favorites.length
    );
    return {
      count: favorites.length,
      avgHeightFavorites,
      avgWeightFavorites
    };
  }

  public async delete(id: string): Promise<IPokemon> {
    const deletedDocument = await Pokemon.findByIdAndDelete(
      id
    ).exec();
    if (!deletedDocument) {
      throw new Error(`Document with id '${id}' not found`);
    }
    return deletedDocument;
  }

}