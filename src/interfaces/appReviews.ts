import { Types, Document } from 'mongoose';

export interface IAppReview extends Document {
    userId: Types.ObjectId
    name: string
    email: string
    description: string
    mobile: number
    isDeleted: boolean
    createdAt: Date
    updatedAt: Date
}