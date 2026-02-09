import express from "express";
import { getAuditLogs } from "../controller/audit.controller.js";

const router = express.Router();

router.get("/", getAuditLogs);

export default router;
