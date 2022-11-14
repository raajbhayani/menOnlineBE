import mongoose, { Schema, model, Types } from "mongoose";
import { IAddress } from "../interfaces/address";

const ObjectId = mongoose.Schema.Types.ObjectId;

const addressSchema = new Schema<IAddress>({
    userId: {
        type: ObjectId,
        ref: "user"
    },
    address: {
        type: String
    },
    landmark: {
        type: String
    },
    serviceAreasId: {
        type: ObjectId,
        ref: "serviceAreas"
    },
    pincode: {
        type: Number
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

const Address = model<IAddress>('address', addressSchema);
export default Address