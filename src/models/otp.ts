import mongoose, { Schema, model, Types } from "mongoose";
import validator from "validator";
import { IOtp } from "../interfaces/otp";

const ObjectId = mongoose.Schema.Types.ObjectId;

const otpsSchema = new Schema<IOtp>({
    userId: {
        type: ObjectId,
        ref: 'user'
    },
    email: {
        type: String,
        // required: [true, "Email is required"],
        index: true,
        trim: true,
        lowercase: true,
        validate: [validator.isEmail, "Invalid Email"],
    },
    mobile: {
        type: Number,
        required: true,
    },
    otp: {
        type: Number,
        required: true
    },
    messageFor: {
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

const Otps = model<IOtp>('otps', otpsSchema);
export default Otps