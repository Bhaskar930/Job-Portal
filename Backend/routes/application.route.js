import express from 'express';
import { allApliedJob, applyJob, getApplicants, updateStatus } from '../controller/application.controller.js';
import isauthenticated from '../middleware/authmiddleware.js';
const router=express.Router();
router.post("/:jobId", isauthenticated, applyJob); 
router.get("/appliedjobs", isauthenticated, allApliedJob);
router.get("/allapplicants/:jobId", isauthenticated, getApplicants); 
router.put("/updateStatus/:id", isauthenticated, updateStatus); 


export default router