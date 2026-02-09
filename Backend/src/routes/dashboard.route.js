import { Router } from "express";
import { verifyToken } from "../middlewares/auth.middleware.js";
import { getDashboardStats } from "../controller/dashboard.controller.js";

const router = Router();

router.get("/stats", verifyToken, getDashboardStats);

export default router;
