import { Types, Document } from 'mongoose';

export interface IWorkHistory extends Document {
    userId: Types.ObjectId
    location: string
    img: string[]
    comment: Array<{ userId: Types.ObjectId, comment: string }>
    isDeleted: boolean
    createdAt: Date
    updatedAt: Date
}