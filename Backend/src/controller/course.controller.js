import {
  getCourses,
  updateCourse,
  deleteCourse,
  createCourse,
} from "../services/course.service.js";

import { createAuditLog } from "../services/audit.service.js";
import { createCourseSchema } from "../validation/course.validation.js";

export async function addCourse(req, res) {
  try {
    // ✅ 1️⃣ Validate Request
    const validatedData = createCourseSchema.parse(req.body);

    // ✅ 2️⃣ Create Course
    await createCourse(validatedData);

    await createAuditLog({
      action: "CREATE",
      module: "Course",
      description: `Course created: ${validatedData.name}`,
      userAgent: req.headers["user-agent"],
    });

    res.json({
      success: true,
      message: "Course added successfully",
    });

  } catch (error) {
    console.error("ADD COURSE ERROR:", error);

    // ❌ Zod Validation Error
    if (error.name === "ZodError") {
      return res.status(400).json({
        success: false,
        message: error.errors[0].message, // first error
        errors: error.errors, // all errors (optional)
      });
    }

    // ❌ Other Errors
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

export async function getAllCourses(req, res) {
  try {
    const data = await getCourses();

    if (!data || data.length === 0) {
      return res.json({
        success: true,
        message: "No courses available",
        data: [],
      });
    }

    res.json({
      success: true,
      message: "Courses fetched successfully",
      data,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

export async function editCourse(req, res) {
  try {
    const validatedData = createCourseSchema.parse(req.body);

    await updateCourse(req.params.id, validatedData);

    await createAuditLog({
      action: "UPDATE",
      module: "Course",
      description: `Course updated: ID ${req.params.id}`,
      userAgent: req.headers["user-agent"],
    });

    res.json({
      success: true,
      message: "Course updated successfully",
    });

  } catch (error) {
    console.error("UPDATE COURSE ERROR:", error);

    if (error.name === "ZodError") {
      return res.status(400).json({
        success: false,
        message: error.errors[0].message,
        errors: error.errors,
      });
    }

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

export async function removeCourse(req, res) {
  try {
    await deleteCourse(req.params.id);

    await createAuditLog({
      action: "DELETE",
      module: "Course",
      description: `Course deleted: ID ${req.params.id}`,
      userAgent: req.headers["user-agent"],
    });

    res.json({ success: true, message: "Course deleted" });
  } catch (error) {
    console.error("DELETE COURSE ERROR:", error);

    await createAuditLog({
      action: "FAILED_DELETE",
      module: "Course",
      description: `Failed to delete course ID: ${req.params.id}`,
      userAgent: req.headers["user-agent"],
    });

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
