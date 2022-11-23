export interface IUser {
    fullName: string
    userName: string
    email: string
    mobile: number
    gender: string
    password: string
    address: string
    pincode: number
    city: string
    state: string
    country: string
    socketId: string
    isAdmin: boolean
    avatar: string
    review: Array<{ orderId: string, description: string, rate: number }>
    role: string
    price: number
    serviceAreaId: string[]
    workImage: Array<{ img: string, location: string, userId: string, comment: string, createdAt: Date }>
    language: string
    isNeeded: boolean
    isValid: boolean
    needsCategoryId: string[]
    needsLocationId: string[]
    isKyc: boolean
    isDeleted: boolean
    createdAt: Date
    updatedAt: Date
}