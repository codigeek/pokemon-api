
import { IProductCategory } from "../../interfaces/filler/product_category.interface";
import { model, Schema } from "mongoose";

const ProductCategorySchema = new Schema({
    // _id: { type: String },
    description: { type: String, required: [true, "Field is required"] },
    editable: { type: Boolean, required: [true, "Field is required"] },
});

export const ProductCategory = model<IProductCategory>("ProductCategory", ProductCategorySchema);