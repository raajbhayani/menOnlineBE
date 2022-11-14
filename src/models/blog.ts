import mongoose, { Schema, model, Types } from "mongoose";
import { IBlog } from "../interfaces/blog";

const blogSchema = new Schema<IBlog>({
    title: {
        type: String
    },
    content: {
        type: String
    },
    image: {
        type: String
    },
    index: {
        type: Number
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

const Blog = model<IBlog>('blog', blogSchema);
export default Blog