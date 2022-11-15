import mongoose, { Schema, model, Types } from "mongoose";
import { IWorkHistory } from "../interfaces/workHistory";

const ObjectId = mongoose.Schema.Types.ObjectId;

const otpSchema = new Schema<IWorkHistory>({
    userId: {
        type: ObjectId,
        required: true,
        ref: 'user'
    },
    location: {
        type: String,
        required: true
    },
    img: [{
        type: String
    }],
    comment: [{
        userId: {
            type: ObjectId,
            ref: 'user'
        },
        comment: String
    }],
    isDeleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

const Otp = model<IWorkHistory>('otp', otpSchema);
export default Otp