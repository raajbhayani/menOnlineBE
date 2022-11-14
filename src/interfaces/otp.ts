import { Types, Document } from 'mongoose';

export interface IOtp extends Document {
    userId: Types.ObjectId
    otp: number
    for: string
    isDeleted: boolean
    createdAt: Date
    updatedAt: Date
}