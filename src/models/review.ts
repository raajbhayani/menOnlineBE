import mongoose, { Schema, model, Types } from "mongoose";
import { IReview } from "../interfaces/review";

const ObjectId = mongoose.Schema.Types.ObjectId;

const otpSchema = new Schema<IReview>({
    userId: {
        type: ObjectId,
        required: true,
        ref: 'user'
    },
    description: {
        type: String,
        required: true
    },
    rate: {
        type: Number,
        required: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

const Otp = model<IReview>('otp', otpSchema);
export default Otp