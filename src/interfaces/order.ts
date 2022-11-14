import { Types, Document } from 'mongoose';

export interface IOrder extends Document {
    by: Types.ObjectId
    to: Types.ObjectId
    state: string
    price: number
    paymentMethod: string
    categoryId: Types.ObjectId
    rate: number
    isDeleted: boolean
    createdAt: Date
    updatedAt: Date
}