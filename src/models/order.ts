import mongoose, { Schema, model, Types } from "mongoose";
import { IOrder } from "../interfaces/order";

const ObjectId = mongoose.Schema.Types.ObjectId;

const orderSchema = new Schema<IOrder>({
    by: {
        type: ObjectId,
        required: true,
        ref: "user"
    },
    to: {
        type: ObjectId,
        required: true,
        ref: "user"
    },
    byIsConformed: {
        type: Boolean,
    },
    toIsConformed: {
        type: Boolean,
    },
    status: {
        type: String,
        enum: ["progress", "complete"],
        required: true
    },
    price: {
        type: Number
    },
    paymentMethod: {
        type: String,
        enum: ["cash", "razorpay"],
    },
    categoryId: {
        type: ObjectId,
        ref: "subCategory",
        required: true,
    },
    rate: {
        type: Number,
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

const Order = model<IOrder>('order', orderSchema);
export default Order