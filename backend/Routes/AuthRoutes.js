import express from "express";
import { SignUp, SignIn, SignOut } from "../Controllers/AuthControllers.js"; 

const router = express.Router();

router.post("/signup", SignUp);
router.post("/signin", SignIn); 
router.post("/signout", SignOut);

export default router;
