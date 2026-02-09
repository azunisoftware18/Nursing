import fs from "fs";
import path from "path";
import { createBlog, getBlogs, deleteBlog } from "../services/blog.service.js";
import { db } from "../database/db.js";
import { blogsTable } from "../models/blog.schema.js";
import { eq } from "drizzle-orm";
import { createAuditLog } from "../services/audit.service.js";

export const addBlog = async (req, res) => {
  try {
    const image = req.file ? req.file.filename : null;

    await createBlog({
      title: req.body.title,
      code: req.body.code,
      description: req.body.description,
      image,
    });

    await createAuditLog({
      action: "CREATE",
      module: "Blog",
      description: `Blog created: ${req.body.title}`,
      userAgent: req.headers["user-agent"],
    });

    res.status(201).json({
      success: true,
      message: "Blog created successfully",
    });
  } catch (error) {
    console.error("ADD BLOG ERROR:", error);

    await createAuditLog({
      action: "FAILED_CREATE",
      module: "Blog",
      description: `Failed to create blog: ${req.body.title || "Unknown"}`,
      userAgent: req.headers["user-agent"],
    });

    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await getBlogs();
    res.json({ success: true, data: blogs });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch blogs",
    });
  }
};

export const updateBlog = async (req, res) => {
  try {
    const image = req.file?.filename;

    const data = {
      title: req.body.title,
      code: req.body.code,
      description: req.body.description,
    };

    if (image) data.image = image;

    await db
      .update(blogsTable)
      .set(data)
      .where(eq(blogsTable.id, req.params.id));

    await createAuditLog({
      action: "UPDATE",
      module: "Blog",
      description: `Blog updated: ID ${req.params.id}`,
      userAgent: req.headers["user-agent"],
    });

    res.json({ success: true, message: "Blog updated" });
  } catch (error) {
    console.error("UPDATE BLOG ERROR:", error);

    await createAuditLog({
      action: "FAILED_UPDATE",
      module: "Blog",
      description: `Failed to update blog ID: ${req.params.id}`,
      userAgent: req.headers["user-agent"],
    });

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const removeBlog = async (req, res) => {
  try {
    const blog = await db
      .select()
      .from(blogsTable)
      .where(eq(blogsTable.id, req.params.id));

    if (!blog.length) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    if (blog[0].image) {
      const imgPath = path.join("uploads/blogs", blog[0].image);
      if (fs.existsSync(imgPath)) {
        fs.unlinkSync(imgPath);
      }
    }

    await deleteBlog(req.params.id);

    await createAuditLog({
      action: "DELETE",
      module: "Blog",
      description: `Blog deleted: ${blog[0].title}`,
      userAgent: req.headers["user-agent"],
    });

    res.json({
      success: true,
      message: "Blog deleted successfully",
    });
  } catch (error) {
    console.error("DELETE BLOG ERROR:", error);

    await createAuditLog({
      action: "FAILED_DELETE",
      module: "Blog",
      description: `Failed to delete blog ID: ${req.params.id}`,
      userAgent: req.headers["user-agent"],
    });

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const getBlogById = async (req, res) => {
  try {
    const { id } = req.params;

    const blog = await db
      .select()
      .from(blogsTable)
      .where(eq(blogsTable.id, id))
      .limit(1);

    if (!blog.length) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    res.json({
      success: true,
      data: blog[0],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};