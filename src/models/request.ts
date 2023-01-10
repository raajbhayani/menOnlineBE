import mongoose, { Schema, model, Types } from "mongoose";
import { IRequest } from "../interfaces/request";

const ObjectId = mongoose.Schema.Types.ObjectId;

const requestSchema = new Schema<IRequest>({
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
    status: {
        type: String,
        default: 'pending',
        enum: ['success', 'reject', 'pending']
    },
    categoryId: {
        type: ObjectId,
        required: true,
        ref: "category"
    },
    date: {
        type: Number
    },
    price: {
        type: Number
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

const Request = model<IRequest>('request', requestSchema);
export default Request