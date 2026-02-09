import { db } from "../database/db.js";
import { blogsTable } from "../models/blog.schema.js";
import { eq } from "drizzle-orm";

export const createBlog = async (data) => {
  const existing = await db
    .select()
    .from(blogsTable)
    .where(eq(blogsTable.code, data.code));

  if (existing.length > 0) {
    throw new Error("Blog with this code already exists");
  }

  return await db.insert(blogsTable).values(data);
};

export const getBlogs = async () => {
  return await db.select().from(blogsTable);
};

export const deleteBlog = async (id) => {
  return await db.delete(blogsTable).where(eq(blogsTable.id, id));
};
