
import { Document } from "mongoose";

export interface IPokemon extends Document {
    _id: string;
    id: string;
    name: string;
    url: string;
    detail: Object;
    favorite: boolean;
}