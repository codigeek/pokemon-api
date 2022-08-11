
import { Document } from "mongoose";

export interface IEstate extends Document {
    _id: string;
    title: string;
    description: string;
}