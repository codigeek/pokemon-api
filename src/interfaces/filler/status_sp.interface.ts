
import { Document } from "mongoose";
import mongoose from "mongoose";

export interface IStatusSP extends Document {
    _id: mongoose.Schema.Types.ObjectId;
    description: string;
}