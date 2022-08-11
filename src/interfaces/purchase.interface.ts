
import { Document } from "mongoose";
import { IProduct } from "./product.interface";

export interface IPurchase extends Document {
    _id: string;
    name: string;
    branch: string;
    branch_id: string;
    description: string;
    purchase_price: number;
    sale_price: number;
    products: Array<IProduct>;
}