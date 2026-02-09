import { Router } from "express";
import { login } from "../controller/auth.controller.js";
import { validate } from "../middlewares/validate.js";
import { loginSchema } from "../validation/auth.validation.js";


const router = Router();

router.post("/login", validate(loginSchema), login);

export default router;
