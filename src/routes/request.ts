import express from "express";
const router = express.Router();
import { authUsers, authAdmin, authLabour, authContractor, authGeneral } from "../middleware/auth";
import { } from "../controllers/request";

router.post('/add', authGeneral);

export default router;