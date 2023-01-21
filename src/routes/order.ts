import express from "express";
const router = express.Router();
import { authUsers, authAdmin, authLabour, authContractor, authGeneral } from "../middleware/auth";
import { addOrder, getOrder, updateOrder, deleteOrder, } from "../controllers/order";

router.post('/add', authGeneral, addOrder);

router.get('/get', authGeneral, getOrder);

router.put('/update', authGeneral, updateOrder,);

router.delete('/delete/:id', authGeneral, deleteOrder);

export default router;