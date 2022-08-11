
import { IClient } from "../interfaces/client.interface";
import { model, Schema } from "mongoose";
import mongoose from "mongoose";

const ClientSchema = new Schema({
    name: { type: String, required: [true, "Field is required"] },
    description: { type: String, required: [true, "Field is required"] },
    idif: { type: String, required: [true, "Field is required"] },
    photo: { type: String },
    users: [mongoose.Types.ObjectId],
    active: { type: Boolean, required: [true, "Field is required"] },
    date_created: Date,
    date_modified: Date,
});

export const Client = model<IClient>("Client", ClientSchema);