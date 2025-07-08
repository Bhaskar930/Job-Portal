import express from 'express';

import isauthenticated from '../middleware/authmiddleware.js';

import { getAdminJobs, getAllJobs, getJobById, postJob } from '../controller/job.controller.js';


const router=express.Router();
router.post('/post',isauthenticated,postJob);
router.get('/alljobs',isauthenticated,getAllJobs);
router.get('/me',isauthenticated,getAdminJobs);
router.get('/:id',isauthenticated,getJobById);


export default router;