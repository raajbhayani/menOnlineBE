import { Types, Document } from 'mongoose';

export interface ICategory extends Document {
    name: string
    description: string
    traded: number
    relatedServices: Types.ObjectId
    index: number
    trandedIndex: number
    img: string
    icon: string
    isDeleted: boolean
    createAt: Date
    updatedAt: Date
}