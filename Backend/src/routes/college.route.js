import { Router } from "express";
import {
  addCollege,
  getColleges,
  editCollege,
  deleteCollege,
  getCollegeById,
  getCollegeCourses,
  searchColleges,
  getCollegesByCourse,
  getCollegesByLocation,
} from "../controller/college.controller.js";

import { verifyToken, isAdmin } from "../middlewares/auth.middleware.js";
import { checkCollegeExists } from "../middlewares/college.middleware.js";
import { validate } from "../middlewares/validate.js";
import { createCollegeSchema } from "../validation/college.validation.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.post(
  "/",
  verifyToken,
  isAdmin,
  upload("colleges").fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "gallery", maxCount: 10 },
  ]),
  
  addCollege
);

router.put(
  "/:id",
  verifyToken,
  isAdmin,
  upload("colleges").fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "gallery", maxCount: 10 },
  ]),
  checkCollegeExists,
  editCollege
);

router.get("/college/by-course", getCollegesByCourse);
router.get("/search", searchColleges);
router.get("/filter", getCollegesByLocation);

router.get("/", getColleges);
router.get("/:id/courses", getCollegeCourses);
router.get("/:id", getCollegeById);

router.delete("/:id", verifyToken, isAdmin, checkCollegeExists, deleteCollege);

export default router;
