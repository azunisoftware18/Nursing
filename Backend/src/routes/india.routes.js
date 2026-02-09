import { Router } from "express";
import {
  getIndiaStatesCities,
  getCitiesByState,
} from "../controller/india.controller.js";

const router = Router();

router.get("/states-cities", getIndiaStatesCities);

router.get("/cities", getCitiesByState);

export default router;
