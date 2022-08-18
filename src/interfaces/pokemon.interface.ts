
import { Document } from "mongoose";

export interface IPokemon extends Document {
    _id: string;
    name: string;
    description: string;
    users: Array<string>;
}