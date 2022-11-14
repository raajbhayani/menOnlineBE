import express from "express";
const router = express.Router();
import { authUsers, authAdmin, authLabour, authContractor, authGeneral } from "../middleware/auth"
import { addAppReviews, updateAppReviews } from "../controllers/appReview";

router.post('/add', authGeneral, addAppReviews);

router.post('/update', authGeneral, authAdmin);

export default router;