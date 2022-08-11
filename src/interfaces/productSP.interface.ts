
import { Document } from "mongoose";

export interface IProductSP extends Document {
    _id: string;
    name: string;
    description: string;
    purchase_price: number;
    sale_price: number;
}