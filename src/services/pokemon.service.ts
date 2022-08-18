import { Pokemon } from "../models/pokemon.model";
import { IPokemon } from "../interfaces/pokemon.interface";
import mongoose from "mongoose";
import axios from "axios";

export class PokemonService {

  public async findAll(quantity: any, page: any, search: any): Promise<IPokemon[]> {
    try {
      const response = await axios.get('https://pokeapi.co/api/v2/pokemon', {
        params: {
          limit: quantity,
          offset: quantity * (page - 1)
        }
      });
      if( response?.data ){
        response.data.avgHeight = 0;
        response.data.avgWeight = 0;
      }
      await Promise.all(response?.data?.results.map(async (pokemon: any) => {
        const contents = await axios.get(pokemon.url);
        pokemon.detail = contents?.data;
        response.data.avgHeight = response.data.avgHeight + pokemon?.detail?.height;
        response.data.avgWeight = response.data.avgWeight + pokemon?.detail?.weight;
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
      response.data.avgHeight = Math.floor(response.data.avgHeight/response?.data?.results?.length);
      response.data.avgWeight = Math.floor(response.data.avgWeight/response?.data?.results?.length);
      return response?.data;
    } catch (error) {
      throw error;
    }
  }

  public findByID(id: string): Promise<IPokemon[]> {
    return Pokemon.find({ id: id }).exec();
  }

  public add(record: IPokemon): Promise<IPokemon> {
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

  public async update(id: string, record: IPokemon): Promise<IPokemon> {
    const updatedDocument = await Pokemon.findByIdAndUpdate(
      id,
      record
    ).exec();
    if (!updatedDocument) {
      throw new Error(`Document with id '${id}' not found`);
    }
    return updatedDocument;
  }

}