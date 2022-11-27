import express from "express";
const router = express.Router();
import { authUsers, authAdmin, authLabour, authContractor, authGeneral } from "../middleware/auth";
import { addServiceAreas, getServiceAreas, updateServiceAreas, deleteServiceAreas } from "../controllers/serviceAreas";

router.post('/add', authAdmin, addServiceAreas);

router.get('/get', addServiceAreas);

router.put('/update', authAdmin, addServiceAreas);

router.delete('/delete', authAdmin, addServiceAreas);

export default router;