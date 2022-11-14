import mongoose, { Schema, model, Types } from "mongoose";
import { IServiceAreas } from "../interfaces/serviceAreas";

const serviceAreasSchema = new Schema<IServiceAreas>({
    name: {
        type: String
    },
    isCity: {
        type: Boolean
    },
    district: {
        type: String
    },
    state: {
        type: String
    },
    country: {
        type: String
    },
    pincode: {
        type: Number
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

const ServiceAreas = model<IServiceAreas>('serviceAreas', serviceAreasSchema);
export default ServiceAreas