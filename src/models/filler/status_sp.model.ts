
import { IStatusSP } from "../../interfaces/filler/status_sp.interface";
import { model, Schema } from "mongoose";

const StatusSPSchema = new Schema({
    // _id: { type: String },
    description: { type: String, required: [true, "Field is required"] },
    editable: { type: Boolean, required: [true, "Field is required"] },
});

export const StatusSP = model<IStatusSP>("StatusSP", StatusSPSchema);