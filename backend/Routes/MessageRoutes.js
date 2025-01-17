import express from "express"
import { protectRoute } from "../middlewares/ProtectRoute.js";

import { getUsers,getMessages,sendMessages } from "../Controllers/MessageControllers.js";

const router = express.Router();


router.get("/users",protectRoute, getUsers);
router.get("/:id",protectRoute, getMessages);
router.post("/send/:id",protectRoute, sendMessages);


export default router;