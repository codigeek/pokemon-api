import { Pokemon } from "../models/pokemon.model";
import { IPokemon } from "../interfaces/pokemon.interface";
import mongoose from "mongoose";
import axios from "axios";

export class PokemonService {

  public async findAll(quantity: any, page: any, search: any): Promise<IPokemon[]> {
    try {
      const response = await axios.get('https://pokeapi.co/api/v2/pokemon', {
        params: {
          limit: 10,
          offset: 0
        }
      });
      await Promise.all(response?.data?.results.map(async (pokemon: any) => {
        const contents = await axios.get(pokemon.url);
        pokemon.detail = contents?.data;
      }));
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