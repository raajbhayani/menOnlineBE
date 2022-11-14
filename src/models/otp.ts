import mongoose, { Schema, model, Types } from "mongoose";
import { IOtp } from "../interfaces/otp";

const ObjectId = mongoose.Schema.Types.ObjectId;

const otpSchema = new Schema<IOtp>({
    userId: {
        type: ObjectId,
        required: true,
        ref: 'user'
    },
    otp: {
        type: Number,
        required: true
    },
    for: {
        type: String,
        required: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

const Otp = model<IOtp>('otp', otpSchema);
export default Otp