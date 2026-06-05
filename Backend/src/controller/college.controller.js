import fs from "fs";
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
import { upload, deleteByKey, getSignedFileUrl } from "../utils/s3Service.js";

// Helper to extract S3 key from URL
function extractKeyFromUrl(url) {
  if (!url) return null;
  try {
    // Extract key from S3 URL format: https://bucket.s3.region.amazonaws.com/key
    const urlParts = url.split('.amazonaws.com/');
    if (urlParts.length > 1) {
      return urlParts[1];
    }
    return null;
  } catch (error) {
    return null;
  }
}

// Helper function to generate signed URLs for college data
async function generateSignedUrlsForCollege(college) {
  if (!college) return college;

  const updatedCollege = { ...college };

  // Generate signed URL for thumbnail
  if (college.thumbnail) {
    try {
      const key = extractKeyFromUrl(college.thumbnail);
      if (key) {
        updatedCollege.thumbnailSignedUrl = await getSignedFileUrl(key);
      } else {
        updatedCollege.thumbnailSignedUrl = college.thumbnail;
      }
    } catch (error) {
      console.error("Error generating signed URL for thumbnail:", error);
      updatedCollege.thumbnailSignedUrl = college.thumbnail;
    }
  }

  // Generate signed URLs for gallery images
  if (college.gallery && Array.isArray(college.gallery) && college.gallery.length > 0) {
    updatedCollege.gallerySignedUrls = await Promise.all(
      college.gallery.map(async (imageUrl) => {
        try {
          const key = extractKeyFromUrl(imageUrl);
          if (key) {
            return await getSignedFileUrl(key);
          }
          return imageUrl;
        } catch (error) {
          console.error("Error generating gallery signed URL:", error);
          return imageUrl;
        }
      })
    );
  }

  return updatedCollege;
}

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

    const facilitiesArray = Array.isArray(facilities)
      ? facilities
      : facilities?.split(",").map(f => f.trim()).filter(Boolean) || [];

    const parsedCourseIds = courseIds
      ? Array.isArray(courseIds)
        ? courseIds
        : JSON.parse(courseIds)
      : [];

    // Upload thumbnail to S3 - store only URL
    let thumbnailUrl = null;
    const thumbnailFile = req.files?.thumbnail?.[0];

    if (thumbnailFile) {
      try {
        const thumbnailLocalPath = thumbnailFile.path;
        
        if (!fs.existsSync(thumbnailLocalPath)) {
          throw new Error(`Thumbnail file not found at path: ${thumbnailLocalPath}`);
        }

        const s3Result = await upload(thumbnailLocalPath);
        thumbnailUrl = s3Result.url;
        console.log("Thumbnail uploaded to S3:", thumbnailUrl);
      } catch (error) {
        console.error("S3 Upload Error for thumbnail:", error);
        return res.status(500).json({
          success: false,
          message: "Failed to upload thumbnail. " + error.message,
        });
      }
    }

    // Upload gallery images to S3 - store only URLs
    let galleryUrls = [];
    const galleryFiles = req.files?.gallery || [];

    if (galleryFiles.length > 0) {
      try {
        galleryUrls = await Promise.all(
          galleryFiles.map(async (file) => {
            const localPath = file.path;
            
            if (!fs.existsSync(localPath)) {
              throw new Error(`Gallery file not found at path: ${localPath}`);
            }

            const s3Result = await upload(localPath);
            return s3Result.url;
          })
        );
        console.log("Gallery uploaded to S3. Count:", galleryUrls.length);
      } catch (error) {
        console.error("S3 Upload Error for gallery:", error);
        return res.status(500).json({
          success: false,
          message: "Failed to upload gallery images. " + error.message,
        });
      }
    }

    const college = await createCollegeService({
      name,
      code,
      description: description || '',
      sector: sector || 'Private',
      genderAcceptance: genderAcceptance || 'Co-ed',
      establishedYear: establishedYear ? parseInt(establishedYear) : null,
      state: state || null,
      district: district || null,
      city: city || null,
      address: address || null,
      googleMapLink: googleMapLink || null,
      affiliation: affiliation || null,
      approvedBy: approvedBy || null,
      coursesCount: coursesCount ? parseInt(coursesCount) : 0,
      experienceYears: experienceYears ? parseInt(experienceYears) : 0,
      studentsCount: studentsCount ? parseInt(studentsCount) : 0,
      facilities: facilitiesArray,
      courseIds: parsedCourseIds,
      thumbnail: thumbnailUrl,
      gallery: galleryUrls,
      youtubeVideo: youtubeVideo || null,
    });

    await createAuditLog({
      action: "CREATE",
      module: "College",
      description: `College created: ${name}`,
      userAgent: req.headers["user-agent"],
    });

    const collegeWithSignedUrls = await generateSignedUrlsForCollege(college);

    res.status(201).json({
      success: true,
      message: "College created successfully",
      data: collegeWithSignedUrls,
    });

  } catch (error) {
    console.error("CREATE COLLEGE ERROR:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getColleges = async (req, res) => {
  try {
    const colleges = await getAllCollegesService();

    if (!colleges || colleges.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No colleges available",
        data: [],
      });
    }

    const collegesWithSignedUrls = await Promise.all(
      colleges.map(college => generateSignedUrlsForCollege(college))
    );

    res.json({
      success: true,
      message: "Colleges fetched successfully",
      data: collegesWithSignedUrls,
    });

  } catch (error) {
    console.error("GET COLLEGES ERROR:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getCollegeById = async (req, res) => {
  try {
    const college = await getCollegeByIdService(req.params.id);
    
    if (!college) {
      return res.status(404).json({ 
        success: false, 
        message: "College not found" 
      });
    }

    const collegeWithSignedUrls = await generateSignedUrlsForCollege(college);

    res.json({ 
      success: true, 
      data: collegeWithSignedUrls 
    });
  } catch (error) {
    console.error("GET COLLEGE ERROR:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const editCollege = async (req, res) => {
  try {
    const existingCollege = await getCollegeByIdService(req.params.id);
    
    if (!existingCollege) {
      return res.status(404).json({
        success: false,
        message: "College not found",
      });
    }

    const updatedData = { ...req.body };

    // Handle thumbnail upload to S3
    const thumbnailFile = req.files?.thumbnail?.[0];
    
    if (thumbnailFile) {
      try {
        // Delete old thumbnail from S3
        if (existingCollege.thumbnail) {
          const oldKey = extractKeyFromUrl(existingCollege.thumbnail);
          if (oldKey) {
            try {
              await deleteByKey(oldKey);
              console.log("Deleted old thumbnail from S3:", oldKey);
            } catch (error) {
              console.error("Failed to delete old thumbnail:", error);
            }
          }
        }

        // Upload new thumbnail
        const thumbnailLocalPath = thumbnailFile.path;
        
        if (!fs.existsSync(thumbnailLocalPath)) {
          throw new Error(`Thumbnail file not found at path: ${thumbnailLocalPath}`);
        }

        const s3Result = await upload(thumbnailLocalPath);
        updatedData.thumbnail = s3Result.url;
        console.log("New thumbnail uploaded:", s3Result.url);
      } catch (error) {
        console.error("S3 Upload Error for thumbnail:", error);
        return res.status(500).json({
          success: false,
          message: "Failed to upload thumbnail. " + error.message,
        });
      }
    }

    // Handle gallery upload to S3
    const galleryFiles = req.files?.gallery || [];
    
    if (galleryFiles.length > 0) {
      try {
        // Delete old gallery images from S3
        const existingGallery = Array.isArray(existingCollege.gallery) 
          ? existingCollege.gallery 
          : JSON.parse(existingCollege.gallery || '[]');
          
        for (const imageUrl of existingGallery) {
          const key = extractKeyFromUrl(imageUrl);
          if (key) {
            try {
              await deleteByKey(key);
              console.log("Deleted old gallery image:", key);
            } catch (error) {
              console.error("Failed to delete old gallery image:", error);
            }
          }
        }

        // Upload new gallery images
        const galleryUrls = await Promise.all(
          galleryFiles.map(async (file) => {
            const localPath = file.path;
            
            if (!fs.existsSync(localPath)) {
              throw new Error(`Gallery file not found at path: ${localPath}`);
            }

            const s3Result = await upload(localPath);
            return s3Result.url;
          })
        );

        updatedData.gallery = galleryUrls;
        console.log("New gallery uploaded. Count:", galleryUrls.length);
      } catch (error) {
        console.error("S3 Upload Error for gallery:", error);
        return res.status(500).json({
          success: false,
          message: "Failed to upload gallery images. " + error.message,
        });
      }
    }

    // Parse arrays if they exist
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

    // Get updated college with signed URLs
    const updatedCollege = await getCollegeByIdService(req.params.id);
    const collegeWithSignedUrls = await generateSignedUrlsForCollege(updatedCollege);

    res.json({
      success: true,
      message: "College updated successfully",
      data: collegeWithSignedUrls,
    });
  } catch (error) {
    console.error("UPDATE COLLEGE ERROR:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteCollege = async (req, res) => {
  try {
    const college = await getCollegeByIdService(req.params.id);
    
    if (college) {
      // Delete thumbnail from S3
      if (college.thumbnail) {
        const key = extractKeyFromUrl(college.thumbnail);
        if (key) {
          try {
            await deleteByKey(key);
            console.log("Deleted thumbnail from S3:", key);
          } catch (error) {
            console.error("Failed to delete thumbnail:", error);
          }
        }
      }

      // Delete gallery images from S3
      const gallery = Array.isArray(college.gallery) 
        ? college.gallery 
        : JSON.parse(college.gallery || '[]');
        
      for (const imageUrl of gallery) {
        const key = extractKeyFromUrl(imageUrl);
        if (key) {
          try {
            await deleteByKey(key);
            console.log("Deleted gallery image:", key);
          } catch (error) {
            console.error("Failed to delete gallery image:", error);
          }
        }
      }
    }

    await deleteCollegeService(req.params.id);

    await createAuditLog({
      action: "DELETE",
      module: "College",
      description: `College deleted (ID: ${req.params.id})`,
      userAgent: req.headers["user-agent"],
    });

    res.json({ success: true, message: "College deleted successfully" });
  } catch (error) {
    console.error("DELETE COLLEGE ERROR:", error);
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

    if (state) {
      conditions.push(
        sql`LOWER(${collegesTable.state}) = ${state.toLowerCase()}`
      );
    }

    if (city) {
      conditions.push(
        sql`LOWER(${collegesTable.city}) = ${city.toLowerCase()}`
      );
    }

    if (conditions.length === 0) {
      return res.json({ success: true, data: [] });
    }

    const colleges = await db
      .select()
      .from(collegesTable)
      .where(sql.join(conditions, sql` AND `));

    const collegesWithSignedUrls = await Promise.all(
      colleges.map(college => generateSignedUrlsForCollege(college))
    );

    if (q) {
      const description = `Searched "${q}" (${colleges.length} results found)`;
      await createAuditLog({
        action: "SEARCH",
        module: "College",
        description,
        userAgent: req.headers["user-agent"],
      });
    }

    res.json({
      success: true,
      data: collegesWithSignedUrls,
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
      return res.json({ success: true, data: [] });
    }

    const colleges = await db
      .select()
      .from(collegesTable)
      .where(
        sql`${collegesTable.courseIds} LIKE ${`%"${course}"%`}`
      );

    const collegesWithSignedUrls = await Promise.all(
      colleges.map(college => generateSignedUrlsForCollege(college))
    );

    res.json({
      success: true,
      data: collegesWithSignedUrls,
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

    const collegesWithSignedUrls = await Promise.all(
      colleges.map(college => generateSignedUrlsForCollege(college))
    );

    res.json({
      success: true,
      data: collegesWithSignedUrls,
    });
  } catch (error) {
    console.error("LOCATION FILTER ERROR:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};