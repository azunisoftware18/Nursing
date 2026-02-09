import {
  getCourses,
  updateCourse,
  deleteCourse,
  createCourse,
} from "../services/course.service.js";

import { createAuditLog } from "../services/audit.service.js";

export async function addCourse(req, res) {
  try {
    await createCourse(req.body);

    await createAuditLog({
      action: "CREATE",
      module: "Course",
      description: `Course created: ${req.body.name}`,
      userAgent: req.headers["user-agent"],
    });

    res.json({ success: true, message: "Course added" });
  } catch (error) {
    console.error("ADD COURSE ERROR:", error);

    await createAuditLog({
      action: "FAILED_CREATE",
      module: "Course",
      description: `Failed to create course: ${req.body.name || "Unknown"}`,
      userAgent: req.headers["user-agent"],
    });

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

export async function getAllCourses(req, res) {
  try {
    const data = await getCourses();

    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

export async function editCourse(req, res) {
  try {
    await updateCourse(req.params.id, req.body);

    await createAuditLog({
      action: "UPDATE",
      module: "Course",
      description: `Course updated: ID ${req.params.id}`,
      userAgent: req.headers["user-agent"],
    });

    res.json({ success: true, message: "Course updated" });
  } catch (error) {
    console.error("UPDATE COURSE ERROR:", error);

    await createAuditLog({
      action: "FAILED_UPDATE",
      module: "Course",
      description: `Failed to update course ID: ${req.params.id}`,
      userAgent: req.headers["user-agent"],
    });

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
