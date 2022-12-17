import express from "express";
const router = express.Router();
import { authUsers, authGeneral } from "../middleware/auth";
import { SignupUser, Login, updateUser, getUserDetails, LoginWithOtp, changePassword, savePassword, SocialSignup, SocialLogin, getLabourContractorList, saveUser } from "../controllers/user";

router.post('/signup', SignupUser);

router.post('/login', Login);

router.post('/socialSignup', SocialSignup);

router.post('/socialLogin', SocialLogin);

router.post('/getLabourContractorList', getLabourContractorList);

router.put('/update', authGeneral, updateUser);

router.post('/loginWithOtp', LoginWithOtp);

router.get('/userDetails', authGeneral, getUserDetails);

router.put('/changePassword', authGeneral, changePassword);

router.post('/savePassword', authGeneral, savePassword);

router.post('/saveUser', saveUser);




export default router;