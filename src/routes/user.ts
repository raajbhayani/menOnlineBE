import express from "express";
const router = express.Router();
import { SignupUser, Login, CheckApi } from "../controllers/user";
import { authUsers } from "../middleware/auth"

router.post('/signup', SignupUser);
router.post('/login', Login);

export default router;