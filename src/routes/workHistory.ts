import express from "express";
const router = express.Router();
import { authUsers, authAdmin, authLabour, authContractor, authGeneral } from "../middleware/auth";
import { } from "../controllers/workHistory";

router.post('/add', authGeneral);

export default router;