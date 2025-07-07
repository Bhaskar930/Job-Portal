import express from 'express';
import { login, register, updateprofile, logout } from '../controller/user.controller.js';
import isauthenticated from '../middleware/authmiddleware.js';

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", isauthenticated, logout);
router.put("/updateprofile", isauthenticated, updateprofile);

export default router;
