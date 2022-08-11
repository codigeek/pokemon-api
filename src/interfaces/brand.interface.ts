
import { Document } from "mongoose";

export interface IBrand extends Document {
    _id: string;
    name: string;
    description: string;
    users: Array<string>;
}