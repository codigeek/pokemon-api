
import { IModule } from "../../interfaces/filler/module.interface";
import { model, Schema } from "mongoose";
import mongoose from "mongoose";

const ModuleSchema = new Schema({
    // _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: [true, "El nombre es requerido"] },
    description: { type: String, required: [true, "La descripción es requerida"] },
});

export const Module = model<IModule>("Module", ModuleSchema);