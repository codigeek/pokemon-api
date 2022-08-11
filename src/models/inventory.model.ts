
import { IInventory } from "../interfaces/inventory.interface";
import { model, Schema } from "mongoose";
import mongoose from "mongoose";
import { ProductSPSchema } from "./productSP.model";

const InventorySchema = new Schema({
    warehouse: { type: mongoose.Schema.Types.ObjectId, ref: 'Warehouse' },
    warehouse_id: { type: String, required: [true, "Field is required"] },
    products: [ProductSPSchema],
    date_created: Date,
    date_modified: Date,
});

export const Inventory = model<IInventory>("Inventory", InventorySchema);