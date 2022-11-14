import express from "express";
const router = express.Router();
import { authUsers, authGeneral } from "../middleware/auth"
import { SignupUser, Login } from "../controllers/user";

router.post('/signup', SignupUser);

router.post('/login', Login);

router.post('/update', authGeneral, Login);

export default router;