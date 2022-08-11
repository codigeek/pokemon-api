
import { IWarehouse } from "../interfaces/warehouse.interface";
import { model, Schema } from "mongoose";
import mongoose from "mongoose";

const WarehouseSchema = new Schema({
    name: { type: String, required: [true, "Field is required"] },
    description: { type: String, required: [true, "Field is required"] },
    branch: {type: mongoose.Schema.Types.ObjectId, ref: 'Branch'},
    branch_id: { type: String, required: [true, "Field is required"] },
    address: { type: String, required: [true, "Field is required"] },
    active: { type: Boolean, required: [true, "Field is required"] },
    date_created: Date,
    date_modified: Date,
});

export const Warehouse = model<IWarehouse>("Warehouse", WarehouseSchema);