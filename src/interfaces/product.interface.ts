
import { Document } from "mongoose";

export interface IProduct extends Document {
    _id: string;
    name: string;
    description: string;
    quantity: number;
    purchase_price: number;
    sale_price: number;
}