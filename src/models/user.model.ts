
import { IUser } from "../interfaces/user.interface";
import { model, Schema } from "mongoose";
import mongoose from "mongoose";

const UserSchema = new Schema({
    name: { type: String, required: [true, "Field is required"] },
    last_name: { type: String, required: [true, "Field is required"] },
    email: { type: String, required: [true, "Field is required"] },
    password: { type: String, required: [true, "Field is required"], select : false },
    user_type: {type: mongoose.Schema.Types.ObjectId, ref: 'UserType'},
    user_type_id: { type: String, required: [true, "Field is required"] },
    photo: { type: String },
    phone: { type: Number, required: [true, "Field is required"] },
    active: { type: Boolean, required: [true, "Field is required"] },
    date_created: Date,
    date_modified: Date,
});

export const User = model<IUser>("User", UserSchema);