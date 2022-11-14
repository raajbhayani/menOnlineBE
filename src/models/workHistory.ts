import mongoose, { Schema, model, Types } from "mongoose";
import { IOtp } from "../interfaces/otp";

const ObjectId = mongoose.Schema.Types.ObjectId;

const otpSchema = new Schema<IOtp>({
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

const Otp = model<IOtp>('otp', otpSchema);
export default Otp