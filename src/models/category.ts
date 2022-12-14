import mongoose, { Schema, model, Types } from "mongoose";
import { ICategory } from "../interfaces/category";

const ObjectId = mongoose.Schema.Types.ObjectId;

const categorySchema = new Schema<ICategory>({
    name: {
        type: String
    },
    description: {
        type: String
    },
    traded: {
        type: Number
    },
    index: {
        type: Number
    },
    trandedIndex: {
        type: Number
    },
    img: {
        type: String
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

const Category = model<ICategory>('category', categorySchema);
export default Category