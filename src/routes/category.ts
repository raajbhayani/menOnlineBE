import express from "express";
const router = express.Router();
import { authUsers, authAdmin, authLabour, authContractor, authGeneral } from "../middleware/auth";
import { addCategory, getCategory, updateCategory, deleteCategory, } from "../controllers/category";

router.post('/add', authGeneral, addCategory);

router.post('/get', authGeneral, getCategory);

router.put('/update', authGeneral, updateCategory);

router.delete('/delete/:id', authGeneral, deleteCategory);


export default router;