
import { Document } from "mongoose";
import mongoose from "mongoose";

export interface IProductCategory extends Document {
    _id: mongoose.Schema.Types.ObjectId;
    description: string;
}