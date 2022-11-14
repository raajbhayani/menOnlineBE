import mongoose, { Schema, model, Types } from "mongoose";
import { IAppReview } from "../interfaces/appReviews";

const ObjectId = mongoose.Schema.Types.ObjectId;

const appReviewSchema = new Schema<IAppReview>({
    userId: {
        type: ObjectId,
        ref: "user"
    },
    name: {
        type: String
    },
    email: {
        type: String
    },
    description: {
        type: String
    },
    mobile: {
        type: Number
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

const AppReview = model<IAppReview>('appReview', appReviewSchema);
export default AppReview