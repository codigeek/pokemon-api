
import { Document } from "mongoose";

export interface IWarehouse extends Document {
    _id: string;
    name: string;
    description: string;
}