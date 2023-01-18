import { Types, Document } from 'mongoose';

export interface IRequest extends Document {
    by: Types.ObjectId
    to: Types.ObjectId
    status: string
    categoryId: Types.ObjectId
    addressId: Types.ObjectId
    price: number
    date: string
    isDeleted: boolean
    createAt: Date
    updatedAt: Date
}