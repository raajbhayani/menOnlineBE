import { Types, Document } from 'mongoose';

export interface IRequest extends Document {
    by: Types.ObjectId
    to: Types.ObjectId
    status: string
    categoryId: Types.ObjectId
    price: number
    isDeleted: boolean
    createAt: Date
    updatedAt: Date
}