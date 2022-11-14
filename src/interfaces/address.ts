import { Types, Document } from "mongoose";

export interface IAddress extends Document {
    userId: Types.ObjectId
    address: string
    landmark: string
    serviceAreasId: Types.ObjectId
    pincode: number
    isDeleted: boolean
    createdAt: Date
    updatedAt: Date
}