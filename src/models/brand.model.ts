
import { IBrand } from "../interfaces/brand.interface";
import { model, Schema } from "mongoose";
import mongoose from "mongoose";

const BrandSchema = new Schema({
    name: { type: String, required: [true, "Field is required"] },
    description: { type: String, required: [true, "Field is required"] },
    category: {type: mongoose.Schema.Types.ObjectId, ref: 'BrandCategory'},
    category_id: { type: String, required: [true, "Field is required"] },
    photo: { type: String },
    users: [mongoose.Types.ObjectId],
    active: { type: Boolean, required: [true, "Field is required"] },
    date_created: Date,
    date_modified: Date,
});

export const Brand = model<IBrand>("Brand", BrandSchema);