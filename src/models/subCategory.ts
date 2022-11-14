import mongoose, { Schema, model, Types } from "mongoose";
import { ISubCategory } from "../interfaces/subCategory";

const ObjectId = mongoose.Schema.Types.ObjectId;

const subCategorySchema = new Schema<ISubCategory>({
    name: {
        type: String
    },
    description: {
        type: String
    },
    mainCategoryId: {
        type: ObjectId,
        required: true,
        ref: "category"
    },
    traded: {
        type: Number
    },
    relatedServices: {
        type: String
    },
    index: {
        type: Number
    },
    trandedIndex: {
        type: Number
    },
    icon: {
        type: String
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

const subCategory = model<ISubCategory>('subCategory', subCategorySchema);
export default subCategory