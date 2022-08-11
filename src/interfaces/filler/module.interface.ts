
import { Document } from "mongoose";
import mongoose from "mongoose";

export interface IModule extends Document {
    _id: mongoose.Schema.Types.ObjectId;
    name: string;
    description: string;
}