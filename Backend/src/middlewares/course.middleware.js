import { eq } from "drizzle-orm";
import { db } from "../database/db.js";
import { coursesTable } from "../models/course.schema.js";

export const checkCourseExists = async (req, res, next) => {
  try {
    const { id } = req.params;

    const course = await db
      .select()
      .from(coursesTable)
      .where(eq(coursesTable.id, id));

    if (!course.length) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error checking course",
    });
  }
};
