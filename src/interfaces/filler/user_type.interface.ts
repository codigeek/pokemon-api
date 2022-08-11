
import { Document } from "mongoose";
import mongoose from "mongoose";

export interface IUserType extends Document {
    _id: mongoose.Schema.Types.ObjectId;
    description: string;
    isAdmin: Boolean;
    isBusiness: Boolean;
    isBrand: Boolean;
    isClient: Boolean;
}