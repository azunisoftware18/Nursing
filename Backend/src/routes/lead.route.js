import { Router } from "express";
import {
  addLead,
  getAllLeads,
  removeLead,
} from "../controller/lead.controller.js";

import { validate } from "../middlewares/validate.js";
import { createLeadSchema } from "../validation/lead.validation.js";
import { verifyToken, isAdmin } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/", validate(createLeadSchema), addLead);

router.get("/", verifyToken, isAdmin, getAllLeads);
router.delete("/:id", verifyToken, isAdmin, removeLead);

export default router;
