import express from "express";
import { handleUserSignup } from "../controller/user.js";


const router = express.Router();

router.route('/signup').post(handleUserSignup)

// router.route('/login').post(handleUserLogin)

export default router;