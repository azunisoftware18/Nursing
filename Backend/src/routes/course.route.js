import { Router } from "express";
import {
  addCourse,
  getAllCourses,
  editCourse,
  removeCourse,
} from "../controller/course.controller.js";

import { verifyToken, isAdmin } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.js";
import { createCourseSchema } from "../validation/course.validation.js";
import { checkCourseExists } from "../middlewares/course.middleware.js";

const router = Router();

router.post(
  "/",
  verifyToken,
  isAdmin,
  validate(createCourseSchema),
  addCourse
);

router.get("/", getAllCourses);

router.put(
  "/:id",
  verifyToken,
  isAdmin,
  checkCourseExists,
  editCourse
);

router.delete(
  "/:id",
  verifyToken,
  isAdmin,
  checkCourseExists,
  removeCourse
);

export default router;
