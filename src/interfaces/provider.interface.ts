
import { Document } from "mongoose";

export interface IProvider extends Document {
    _id: string;
    name: string;
    description: string;
    users: Array<string>;
}