import { Types, Document } from 'mongoose';

export interface IOrder extends Document {
    by: Types.ObjectId
    to: Types.ObjectId
    status: string
    byIsConformed: boolean
    toIsConformed: boolean
    price: number
    paymentMethod: string
    categoryId: Types.ObjectId
    addressId: Types.ObjectId
    rate: number
    isDeleted: boolean
    createdAt: Date
    updatedAt: Date
}