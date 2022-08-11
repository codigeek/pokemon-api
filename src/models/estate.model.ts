
import { IEstate } from "../interfaces/estate.interface";
import { model, Schema } from "mongoose";
import mongoose from "mongoose";

const EstateSchema = new Schema({
    name: { type: String, required: [true, "Field is required"] },
    title: { type: String, required: [true, "Field is required"] },
    description: { type: String, required: [true, "Field is required"] },
    active: { type: Boolean, required: [true, "Field is required"] },
});

export const Estate = model<IEstate>("Estate", EstateSchema);