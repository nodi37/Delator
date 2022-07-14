import * as authController from '../controllers/auth.controller';
import express from "express";
const router = express.Router();

router.post('/login', authController.login);
router.post('/resetpassword', authController.resetPassword); 


export default router;
