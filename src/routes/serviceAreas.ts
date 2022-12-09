import express from "express";
const router = express.Router();
import { authUsers, authAdmin, authLabour, authContractor, authGeneral } from "../middleware/auth";
import { addServiceAreas, getServiceAreas, updateServiceAreas, deleteServiceAreas } from "../controllers/serviceAreas";

router.post('/add', authAdmin, addServiceAreas);

router.get('/get/:page/:limit', getServiceAreas);

router.put('/update', authAdmin, updateServiceAreas);

router.delete('/delete', authAdmin, deleteServiceAreas);

export default router;