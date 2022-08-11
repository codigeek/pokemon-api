
import { Document } from "mongoose";

export interface IUser extends Document {
    _id: string;
    name: string;
    last_name: string;
    phone: string;
    email: string;
    password: string;
    brands: Array<string>;
}