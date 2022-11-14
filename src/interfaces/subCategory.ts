import { Types, Document } from 'mongoose';

export interface ISubCategory extends Document {
    name: string
    description: string
    mainCategoryId: Types.ObjectId
    traded: number
    relatedServices: string
    index: number
    trandedIndex: number
    icon: string
    isDeleted: boolean
    createAt: Date
    updatedAt: Date
}