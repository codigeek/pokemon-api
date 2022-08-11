
import { IBrandCategory } from "../../interfaces/filler/brand_category.interface";
import { model, Schema } from "mongoose";

const BrandCategorySchema = new Schema({
    // _id: { type: String },
    description: { type: String, required: [true, "Field is required"] },
    editable: { type: Boolean, required: [true, "Field is required"] },
});

export const BrandCategory = model<IBrandCategory>("BrandCategory", BrandCategorySchema);