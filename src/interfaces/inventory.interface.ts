
import { Document } from "mongoose";
import { IProduct } from "./product.interface";

export interface IInventory extends Document {
    _id: string;
    name: string;
    description: string;
    products: Array<IProduct>;
}