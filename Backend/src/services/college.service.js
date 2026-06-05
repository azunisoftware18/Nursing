import { db } from "../database/db.js";
import { eq, inArray } from "drizzle-orm";
import { collegesTable } from "../models/college.schema.js";
import { coursesTable } from "../models/course.schema.js";

// Helper to safely parse JSON fields
const parseJsonField = (field, defaultValue = []) => {
  if (!field) return defaultValue;
  
  // If it's already an array/object, return as is
  if (typeof field === 'object') return field;
  
  // If it's a string, try to parse it
  if (typeof field === 'string') {
    try {
      return JSON.parse(field);
    } catch (error) {
      console.error('Error parsing JSON field:', error);
      return defaultValue;
    }
  }
  
  return defaultValue;
};

// Helper function to parse college data
const parseCollegeData = (college) => {
  if (!college) return college;

  return {
    ...college,
    // Parse gallery - handle both string and object cases
    gallery: parseJsonField(college.gallery, []),
    // Parse facilities
    facilities: parseJsonField(college.facilities, []),
    // Parse courseIds
    courseIds: parseJsonField(college.courseIds, []),
  };
};

export const createCollegeService = async (data) => {
  const [existing] = await db
    .select()
    .from(collegesTable)
    .where(eq(collegesTable.code, data.code));

  if (existing) {
    throw new Error("College code already exists");
  }

  await db.insert(collegesTable).values(data);
  
  // Return parsed data
  return parseCollegeData(data);
};

export const getAllCollegesService = async () => {
  const colleges = await db.select().from(collegesTable);
  
  // Parse JSON fields for all colleges
  return colleges.map(parseCollegeData);
};

export const getCollegeByIdService = async (id) => {
  const [college] = await db
    .select()
    .from(collegesTable)
    .where(eq(collegesTable.id, id));

  return parseCollegeData(college);
};

export const updateCollegeService = async (id, data) => {
  const result = await db
    .update(collegesTable)
    .set(data)
    .where(eq(collegesTable.id, id));

  return result;
};

export const deleteCollegeService = async (id) => {
  return await db
    .delete(collegesTable)
    .where(eq(collegesTable.id, id));
};

export const getCollegeCoursesService = async (id) => {
  const college = await getCollegeByIdService(id);

  if (!college) throw new Error("College not found");

  const courseIds = parseJsonField(college.courseIds, []);

  if (!courseIds.length) return [];

  return await db
    .select()
    .from(coursesTable)
    .where(inArray(coursesTable.id, courseIds));
};