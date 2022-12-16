import express from "express";
const router = express.Router();
import { authUsers, authAdmin, authLabour, authContractor, authGeneral } from "../middleware/auth";
import { addCategory, getCategory, updateCategory, deleteCategory, } from "../controllers/category";

router.post('/add', authAdmin, addCategory);

router.post('/get', getCategory);

router.put('/update', authAdmin, updateCategory);

router.delete('/delete/:id', authAdmin, deleteCategory);


export default router;