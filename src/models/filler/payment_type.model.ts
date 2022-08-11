
import { IPaymentType } from "../../interfaces/filler/payment_type.interface";
import { model, Schema } from "mongoose";

const PaymentTypeSchema = new Schema({
    // _id: { type: String },
    description: { type: String, required: [true, "Field is required"] },
    editable: { type: Boolean, required: [true, "Field is required"] },
});

export const PaymentType = model<IPaymentType>("PaymentType", PaymentTypeSchema);