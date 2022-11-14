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
    state: {
        type: String
    },
    price: {
        type: Number
    },
    paymentMethod: {
        type: String
    },
    categoryId: {
        type: ObjectId,
        ref: "subCategory"
    },
    rate: {
        type: Number
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