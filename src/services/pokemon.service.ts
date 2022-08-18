import { Pokemon } from "../models/pokemon.model";
import { IPokemon } from "../interfaces/pokemon.interface";
import axios from "axios";

export class PokemonService {

  public async findPokeAPIPokemon(quantity: any, page: any, literalOffset: any) {
    console.log("Literal offset?: ", { quantity, page, literalOffset });
    const response = await axios.get('https://pokeapi.co/api/v2/pokemon', {
      params: {
        limit: quantity,
        offset: page ? (quantity * (page - 1)) : literalOffset
      }
    });
    return response?.data;
  }

  public async findFavorites(quantity: any, page: any): Promise<IPokemon[]> {
    return await Pokemon.find()
      // .skip(
      //   parseInt(page) === 1 ? 0 : (parseInt(page) - 1) * parseInt(quantity))
      // .limit(
      //   parseInt(page) * parseInt(quantity))
      .exec();
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

  public async pokemonFavoritesComparison(pokemonFavorites: any, apiPokemons: any) {
    return apiPokemons.filter((object1: any) => {
      return !pokemonFavorites.some((object2: any) => {
        return object1.detail.id.toString().trim() === object2.id.toString().trim();
      });
    });
  }

  public async calculateAverages(pokemonFavorites: any, apiPokemons: any) {
    let avgHeightFavorites = 0;
    let avgWeightFavorites = 0;
    pokemonFavorites.forEach((pokemon: any) => {
      avgHeightFavorites = + pokemon?.detail?.height;
      avgWeightFavorites = + pokemon?.detail?.weight;
    });
    let avgHeight = avgHeightFavorites;
    let avgWeight = avgWeightFavorites;
    avgHeightFavorites = avgHeightFavorites / pokemonFavorites.length;
    avgWeightFavorites = avgWeightFavorites / pokemonFavorites.length;
    apiPokemons.forEach((pokemon: any) => {
      avgHeight = + pokemon?.detail?.height;
      avgWeight = + pokemon?.detail?.weight;
    });
    avgHeight = avgHeight / apiPokemons.length;
    avgWeight = avgWeight / apiPokemons.length;
    return {
      avgHeightFavorites,
      avgWeightFavorites,
      avgHeight,
      avgWeight
    };
  }

  public async findAll(quantity: any, page: any, search: any): Promise<any> {
    try {

      let pokemonFavorites = await this.findFavorites(quantity, page);
      pokemonFavorites = await this.findPokemonDetails(pokemonFavorites);

      let pokemonResponse = await this.findPokeAPIPokemon(quantity - pokemonFavorites.length, page, 0);
      const pokemonTotalCount = pokemonResponse?.count;
      let apiPokemons = await this.findPokemonDetails(pokemonResponse?.results);

      apiPokemons = await this.pokemonFavoritesComparison(pokemonFavorites, apiPokemons);

      while ((apiPokemons.length + pokemonFavorites.length) != quantity) {
        pokemonResponse = await this.findPokeAPIPokemon(
          quantity - (apiPokemons.length + pokemonFavorites.length),
          undefined,
          (apiPokemons.length + pokemonFavorites.length)
        );
        apiPokemons = [...apiPokemons, ...(await this.findPokemonDetails(pokemonResponse?.results))];
        apiPokemons = await this.pokemonFavoritesComparison(pokemonFavorites, apiPokemons);
        console.log({ apiL: apiPokemons.length, pfL: pokemonFavorites.length, quantity: quantity });
      }

      return {
        count: pokemonTotalCount,
        ...(await this.calculateAverages(pokemonFavorites, apiPokemons)),
        results: [...pokemonFavorites, ...apiPokemons]
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