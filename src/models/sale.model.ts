
import { ISale } from "../interfaces/sale.interface";
import { model, Schema } from "mongoose";
import mongoose from "mongoose";
import { ProductSPSchema } from "./productSP.model";

const SaleSchema = new Schema({
    client: { type: mongoose.Schema.Types.ObjectId, ref: 'Client' },
    client_id: { type: String, required: [true, "Field is required"] },
    payment_type: { type: mongoose.Schema.Types.ObjectId, ref: 'PaymentType' },
    payment_type_id: { type: String, required: [true, "Field is required"] },
    status_sp: { type: mongoose.Schema.Types.ObjectId, ref: 'StatusSP' },
    status_sp_id: { type: String, required: [true, "Field is required"] },
    sessions: { type: Number, required: [true, "Field is required"] },
    total: { type: Number, required: [true, "Field is required"] },
    products: [ProductSPSchema],
    date_created: Date,
    date_modified: Date,
});

export const Sale = model<ISale>("Sale", SaleSchema);