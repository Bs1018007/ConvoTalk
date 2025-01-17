import express from "express";
import { SignUp, SignIn, SignOut, UpdateProfile, CheckAuth } from "../Controllers/AuthControllers.js"; 
import { protectRoute } from "../middlewares/ProtectRoute.js";

const router = express.Router();

router.post("/signup", SignUp);
router.post("/signin", SignIn); 
router.post("/signout", SignOut);
router.put("/update-profile",protectRoute,UpdateProfile);

router.get("/check",protectRoute,CheckAuth);

export default router;
