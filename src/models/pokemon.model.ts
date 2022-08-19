
import { IPokemon } from "../interfaces/pokemon.interface";
import { model, Schema } from "mongoose";
import mongoose from "mongoose";

const PokemonSchema = new Schema({
    id: { type: String, required: [true, "Field is required"] },
    name: { type: String, required: [true, "Field is required"] },
    url: { type: String, required: [true, "Field is required"] },
    detail: { type: Object },
    favorite: { type: Boolean, required: [true, "Field is required"] }
});

export const Pokemon = model<IPokemon>("Pokemon", PokemonSchema);