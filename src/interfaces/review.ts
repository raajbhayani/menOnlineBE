import { Types, Document } from 'mongoose';

export interface IReview extends Document {
    userId: Types.ObjectId
    description: string
    rate: number
    isDeleted: boolean
    createdAt: Date
    updatedAt: Date
}