import express from "express";
const router = express.Router();
import { authUsers, authAdmin, authLabour, authContractor, authGeneral } from "../middleware/auth"
import { addAddress, getAddress, upDateAddress, deleteAddress } from "../controllers/address";

router.post('/add', authGeneral, addAddress);

router.post('/get', authGeneral, getAddress);

router.post('/update', authGeneral, upDateAddress);

router.post('/delete', authGeneral, deleteAddress);

export default router;