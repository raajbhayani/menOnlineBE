import express from "express";
const router = express.Router();
import { authUsers, authAdmin, authLabour, authContractor, authGeneral } from "../middleware/auth"
import { addAddress, getAddress, upDateAddress, deleteAddress } from "../controllers/address";

router.post('/add', authGeneral, addAddress);

router.get('/get', authGeneral, getAddress);

router.put('/update', authGeneral, upDateAddress);

router.delete('/delete', authGeneral, deleteAddress);

export default router;