
import { IProvider } from "../interfaces/provider.interface";
import { model, Schema } from "mongoose";
import mongoose from "mongoose";

const ProviderSchema = new Schema({
    name: { type: String, required: [true, "Field is required"] },
    description: { type: String, required: [true, "Field is required"] },
    idif: { type: String, required: [true, "Field is required"] },
    photo: { type: String },
    users: [mongoose.Types.ObjectId],
    active: { type: Boolean, required: [true, "Field is required"] },
    date_created: Date,
    date_modified: Date,
});

export const Provider = model<IProvider>("Provider", ProviderSchema);