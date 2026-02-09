import {
  createCollegeService,
  getAllCollegesService,
  updateCollegeService,
  deleteCollegeService,
  getCollegeByIdService,
  getCollegeCoursesService,
} from "../services/college.service.js";

import { createAuditLog } from "../services/audit.service.js";
import { db } from "../database/db.js";
import { sql } from "drizzle-orm";
import { collegesTable } from "../models/college.schema.js";
import { coursesTable } from "../models/course.schema.js";

export const addCollege = async (req, res) => {
  try {
    const {
      name,
      code,
      description,
      sector,
      genderAcceptance,
      establishedYear,
      state,
      district,
      city,
      address,
      googleMapLink,
      affiliation,
      approvedBy,
      coursesCount,
      experienceYears,
      facilities,
      courseIds,
      studentsCount,
      youtubeVideo,
    } = req.body;

    const thumbnail = req.files?.thumbnail?.[0]?.filename || null;
    const gallery = req.files?.gallery?.map(f => f.filename) || [];

    const facilitiesArray = Array.isArray(facilities)
      ? facilities
      : facilities?.split(",").map(f => f.trim());

    const parsedCourseIds = courseIds
      ? Array.isArray(courseIds)
        ? courseIds
        : JSON.parse(courseIds)
      : [];

    const college = await createCollegeService({
      name,
      code,
      description,
      sector,
      genderAcceptance,
      establishedYear,
      state,
      district,
      city,
      address,
      googleMapLink,
      affiliation,
      approvedBy,
      coursesCount,
      experienceYears,
      facilities: facilitiesArray,
      courseIds: parsedCourseIds,
      thumbnail,
      gallery,
      studentsCount,
      youtubeVideo,
    });

    await createAuditLog({
      action: "CREATE",
      module: "College",
      description: `College created: ${name}`,
      userAgent: req.headers["user-agent"],
    });

    res.status(201).json({
      success: true,
      message: "College created successfully",
      data: college,
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getColleges = async (req, res) => {
  try {
    const colleges = await getAllCollegesService();
    res.json({ success: true, data: colleges });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getCollegeById = async (req, res) => {
  try {
    const college = await getCollegeByIdService(req.params.id);
    if (!college)
      return res.status(404).json({ success: false, message: "College not found" });

    res.json({ success: true, data: college });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const editCollege = async (req, res) => {
  try {
    const thumbnail =
      req.files?.thumbnail?.[0]?.filename;

    const gallery =
      req.files?.gallery?.map(f => f.filename) || [];

    const updatedData = {
      ...req.body,
    };

    if (thumbnail) updatedData.thumbnail = thumbnail;
    if (gallery.length > 0) {
  updatedData.gallery = gallery;
}

if (req.body.facilities) {
  updatedData.facilities = Array.isArray(req.body.facilities)
    ? req.body.facilities
    : JSON.parse(req.body.facilities);
}

if (req.body.courseIds) {
  updatedData.courseIds = Array.isArray(req.body.courseIds)
    ? req.body.courseIds
    : JSON.parse(req.body.courseIds);
}

    await updateCollegeService(req.params.id, updatedData);

    res.json({
      success: true,
      message: "College updated successfully",
    });
  } catch (error) {
    console.error("UPDATE ERROR:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};




export const deleteCollege = async (req, res) => {
  try {
    await deleteCollegeService(req.params.id);

    await createAuditLog({
      action: "DELETE",
      module: "College",
      description: `College deleted (ID: ${req.params.id})`,
      userAgent: req.headers["user-agent"],
    });

    res.json({ success: true, message: "College deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


export const getCollegeCourses = async (req, res) => {
  try {
    const courses = await getCollegeCoursesService(req.params.id);
    res.json({ success: true, data: courses });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


export const searchColleges = async (req, res) => {
  try {
    const { q, state, city } = req.query;

    let conditions = [];

    // 🔍 Keyword search
    if (q) {
      const keyword = `%${q.toLowerCase()}%`;
      conditions.push(
        sql`(
          LOWER(${collegesTable.name}) LIKE ${keyword}
          OR LOWER(${collegesTable.city}) LIKE ${keyword}
          OR LOWER(${collegesTable.state}) LIKE ${keyword}
        )`
      );
    }

    // 📍 State filter
    if (state) {
      conditions.push(
        sql`LOWER(${collegesTable.state}) = ${state.toLowerCase()}`
      );
    }

    // 🏙️ City filter
    if (city) {
      conditions.push(
        sql`LOWER(${collegesTable.city}) = ${city.toLowerCase()}`
      );
    }

    // ❌ No filters → empty response
    if (conditions.length === 0) {
      return res.json({ success: true, data: [] });
    }

    const colleges = await db
      .select()
      .from(collegesTable)
      .where(sql.join(conditions, sql` AND `));

  
    if (q) {
      const description =
        `Searched  "${q}" (${colleges.length} results found)`;

      await createAuditLog({
        action: "SEARCH",
        module: "College",
        description,
        userAgent: req.headers["user-agent"],
      });
    }

    res.json({
      success: true,
      data: colleges,
    });

  } catch (error) {
    console.error("COLLEGE SEARCH ERROR:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



export const getCollegesByCourse = async (req, res) => {
  try {
    const { course } = req.query;

    if (!course) {
      return res.json({
        success: true,
        data: [],
      });
    }

    const colleges = await db
      .select()
      .from(collegesTable)
      .where(
        sql`${collegesTable.courseIds} LIKE ${`%"${course}"%`}`
      );

    res.json({
      success: true,
      data: colleges,
    });

  } catch (error) {
    console.error("COURSE FILTER ERROR:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const getCollegesByLocation = async (req, res) => {
  try {
    const { state, city } = req.query;

    let query = sql`1=1`;

    if (state) {
      query = sql`${query} AND LOWER(${collegesTable.state}) = LOWER(${state})`;
    }

    if (city) {
      query = sql`${query} AND LOWER(${collegesTable.city}) = LOWER(${city})`;
    }

    const colleges = await db
      .select()
      .from(collegesTable)
      .where(query);

    res.json({
      success: true,
      data: colleges,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
