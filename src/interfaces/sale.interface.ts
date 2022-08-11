
import { Document } from "mongoose";

export interface ISale extends Document {
    _id: string;
    name: string;
    description: string;
}