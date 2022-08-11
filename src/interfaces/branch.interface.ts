
import { Document } from "mongoose";

export interface IBranch extends Document {
    _id: string;
    name: string;
    description: string;
    users: Array<string>;
}