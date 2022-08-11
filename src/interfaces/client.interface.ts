
import { Document } from "mongoose";

export interface IClient extends Document {
    _id: string;
    name: string;
    description: string;
    users: Array<string>;
}