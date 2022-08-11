
import { IProduct } from "../interfaces/product.interface";
import { model, Schema } from "mongoose";
import mongoose from "mongoose";

export const ProductSPSchema = new Schema({
    name: { type: String, required: [true, "Field is required"] },
    description: { type: String, required: [true, "Field is required"] },
    idif: { type: String, required: [true, "Field is required"] },
    category: {type: mongoose.Schema.Types.ObjectId, ref: 'ProductCategory'},
    category_id: { type: String, required: [true, "Field is required"] },
    purchase_price: { type: Number, required: [true, "Field is required"] },
    sale_price: { type: Number, required: [true, "Field is required"] },
    quantity: { type: Number, required: [true, "Field is required"] },
    total: { type: Number, required: [true, "Field is required"] },
    photo: { type: String },
    active: { type: Boolean, required: [true, "Field is required"] },
    date_created: Date,
    date_modified: Date,
});

export const ProductSP = model<IProduct>("ProductSP", ProductSPSchema);