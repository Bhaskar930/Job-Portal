import express from 'express';
import { getCompany, getCompanyById, registercompany, updateCompany } from '../controller/company.controller.js';
import isauthenticated from '../middleware/authmiddleware.js';
const router=express.Router();

router.post("/register",isauthenticated,registercompany);
router.get("/details",isauthenticated,getCompany);
router.get("/details/:id",isauthenticated,getCompanyById);
router.put("/update/:id",isauthenticated,updateCompany);

export default router;


