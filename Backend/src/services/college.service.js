import { db } from "../database/db.js";
import { eq, inArray } from "drizzle-orm";
import { collegesTable } from "../models/college.schema.js";
import { coursesTable } from "../models/course.schema.js";

export const createCollegeService = async (data) => {
  const [existing] = await db
    .select()
    .from(collegesTable)
    .where(eq(collegesTable.code, data.code));

  if (existing) {
    throw new Error("College code already exists");
  }

  await db.insert(collegesTable).values(data);
  return data;
};

export const getAllCollegesService = async () => {
  return await db.select().from(collegesTable);
};

export const getCollegeByIdService = async (id) => {
  const [college] = await db
    .select()
    .from(collegesTable)
    .where(eq(collegesTable.id, id));

  return college;
};

export const updateCollegeService = async (id, data) => {
  return await db
    .update(collegesTable)
    .set(data)
    .where(eq(collegesTable.id, id));
};

export const deleteCollegeService = async (id) => {
  return await db
    .delete(collegesTable)
    .where(eq(collegesTable.id, id));
};

export const getCollegeCoursesService = async (id) => {
  const [college] = await db
    .select()
    .from(collegesTable)
    .where(eq(collegesTable.id, id));

  if (!college) throw new Error("College not found");

  const courseIds = Array.isArray(college.courseIds)
    ? college.courseIds
    : JSON.parse(college.courseIds || "[]");

  if (!courseIds.length) return [];

  return await db
    .select()
    .from(coursesTable)
    .where(inArray(coursesTable.id, courseIds));
};
