import mongoose, { Schema, model, Types } from "mongoose";
import { IReview } from "../interfaces/review";

const ObjectId = mongoose.Schema.Types.ObjectId;

const reviewSchema = new Schema<IReview>({
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

const Review = model<IReview>('review', reviewSchema);
export default Review