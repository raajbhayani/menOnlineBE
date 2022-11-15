import mongoose, { Schema, model, Types } from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import { IUser } from "../interfaces/user";

const ObjectId = mongoose.Schema.Types.ObjectId;

const userSchema = new Schema<IUser>({
    userName: {
        type: "string"
    },
    fullName: {
        type: "string",
    },
    email: {
        type: String,
        // required: [true, "Email is required"],
        index: true,
        trim: true,
        lowercase: true,
        validate: [validator.isEmail, "Invalid Email"],
    },
    password: {
        type: String,
        // required: [true, "Password is required"],
        trim: true,
        minlength: [8, "Password must be at least 8 characters"],
        maxlength: [128, "Password max length exceed"],
    },
    gender: {
        type: String,
        enum: ["male", "female", "others"],
        default: "male"
    },
    mobile: {
        type: Number,
        required: true,
    },
    address: {
        type: String
    },
    pincode: {
        type: Number
    },
    city: { type: String },
    state: { type: String },
    country: { type: String },
    socketId: { type: String },
    isAdmin: {
        type: Boolean,
        default: false
    },
    avatar: {
        type: String
    },
    role: {
        type: String,
        enum: ["user", "labour", "contractor", "admin"],
        default: "user",
        required: true,
    },
    price: {
        type: Number,
    },
    serviceAreaId: [{
        type: ObjectId,
        ref: "serviceAreas"
    }],
    language: {
        type: String
    },
    isNeeded: {
        type: Boolean
    },
    needsCategoryId: [{
        type: ObjectId,
        ref: "subCategory"
    }],
    needsLocationId: [{
        type: ObjectId,
        ref: "serviceAreas"
    }],
    isKyc: {
        type: Boolean,
        default: false,
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
}, {
    timestamps: true
});

userSchema.pre("save", async function () {
    const user = this;
    if (user.isModified("password")) {
        const saltRounds = 10;
        user.password = await bcrypt.hash(this.password, saltRounds);
    }
});

userSchema.methods.validatePassword = async function (password: string) {
    return await bcrypt.compare(password, this.password);
};

const User = model<IUser>('user', userSchema);
export default User