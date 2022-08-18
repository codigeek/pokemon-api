
import { IPokemon } from "../interfaces/pokemon.interface";
import { model, Schema } from "mongoose";
import mongoose from "mongoose";

const PokemonSchema = new Schema({
    name: { type: String, required: [true, "Field is required"] },
    description: { type: String, required: [true, "Field is required"] },
    idif: { type: String, required: [true, "Field is required"] },
    photo: { type: String },
    users: [mongoose.Types.ObjectId],
    active: { type: Boolean, required: [true, "Field is required"] },
    date_created: Date,
    date_modified: Date,
});

export const Pokemon = model<IPokemon>("Pokemon", PokemonSchema);