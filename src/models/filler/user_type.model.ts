
import { IUserType } from "../../interfaces/filler/user_type.interface";
import { model, Schema } from "mongoose";

const UserTypeSchema = new Schema({
    // _id: { type: String },
    description: { type: String, required: [true, "Field is required"] },
    editable: { type: Boolean, required: [true, "Field is required"] },
    isAdmin: { type: Boolean, required: [true, "Field is required"] },
    isBusiness: { type: Boolean, required: [true, "Field is required"] },
    isBrand: { type: Boolean, required: [true, "Field is required"] },
    isClient: { type: Boolean, required: [true, "Field is required"] },
});

export const UserType = model<IUserType>("UserType", UserTypeSchema);