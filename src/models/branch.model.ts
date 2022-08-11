
import { IBranch } from "../interfaces/branch.interface";
import { model, Schema } from "mongoose";
import mongoose from "mongoose";

const BranchSchema = new Schema({
    name: { type: String, required: [true, "Field is required"] },
    description: { type: String, required: [true, "Field is required"] },
    brand: {type: mongoose.Schema.Types.ObjectId, ref: 'Brand'},
    brand_id: { type: String, required: [true, "Field is required"] },
    users: [mongoose.Types.ObjectId],
    active: { type: Boolean, required: [true, "Field is required"] },
    date_created: Date,
    date_modified: Date,
});

export const Branch = model<IBranch>("Branch", BranchSchema);