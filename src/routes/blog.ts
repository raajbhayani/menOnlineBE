import express from "express";
const router = express.Router();
import { authUsers, authAdmin, authLabour, authContractor, authGeneral } from "../middleware/auth";
import { addBlog, getBlog, updateBlog, deleteBlog } from "../controllers/blog";

router.post('/add', authGeneral, addBlog);

router.post('/get', authGeneral, getBlog);

router.put('/update', authGeneral, updateBlog);

router.delete('/delete/:id', authGeneral, deleteBlog);


export default router;