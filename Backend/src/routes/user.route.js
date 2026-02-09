import { Router } from "express";
import { verifyToken } from "../middlewares/auth.middleware.js";
import { getMyProfile, updateMyProfile } from "../controller/user.controller.js";

const router = Router();

router.get("/me", verifyToken, getMyProfile);

router.put("/me", verifyToken, updateMyProfile);

export default router;
