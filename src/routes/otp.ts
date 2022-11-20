import express from "express";
const router = express.Router();
import { authUsers, authGeneral } from "../middleware/auth";
import { createOtp } from "../controllers/otp";

router.post('/send', authGeneral, createOtp);

export default router;