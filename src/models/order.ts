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
        default: false
    },
    toIsConformed: {
        type: Boolean,
        default: false
    },
    status: {
        type: String,
        enum: ["progress", "complete"],
        default: "progress"
    },
    price: {
        type: Number
    },
    paymentMethod: {
        type: String,
        default: 'cash',
        enum: ["cash", "razorpay"],
    },
    categoryId: {
        type: ObjectId,
        ref: "category",
        required: true,
    },
    rate: {
        type: Number,
    },
    addressId: {
        type: ObjectId,
        ref: "address"
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