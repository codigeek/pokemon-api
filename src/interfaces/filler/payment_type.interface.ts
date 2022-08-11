
import { Document } from "mongoose";
import mongoose from "mongoose";

export interface IPaymentType extends Document {
    _id: mongoose.Schema.Types.ObjectId;
    description: string;
}