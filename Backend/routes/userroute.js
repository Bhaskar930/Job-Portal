import express from 'express';
import { login, register, updateprofile, logout } from '../controller/user.controller.js';
import isauthenticated from '../middleware/authmiddleware.js';
import { singleUpload } from '../middleware/multer.js';

const router = express.Router();

router.post("/register",singleUpload,register);
router.post("/login", login);
router.post("/logout", isauthenticated, logout);
router.put("/updateprofile", isauthenticated, updateprofile);

export default router;
