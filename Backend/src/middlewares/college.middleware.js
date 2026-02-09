import { eq } from "drizzle-orm";
import { collegesTable } from "../models/college.schema.js";
import { db } from "../database/db.js";

export async function checkCollegeExists(req, res, next) {
  try {
    const { collegeId, id } = req.params;

    const college = await db
      .select()
      .from(collegesTable)
      .where(eq(collegesTable.id, collegeId || id));

    if (!college.length) {
      return res.status(404).json({
        success: false,
        message: "College not found",
      });
    }

    req.college = college[0]; // future use
    next();
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
}
