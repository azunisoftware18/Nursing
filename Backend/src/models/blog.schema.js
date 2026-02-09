import { mysqlTable, varchar, text, timestamp, uniqueIndex } from "drizzle-orm/mysql-core";
import { sql } from "drizzle-orm";

export const blogsTable = mysqlTable(
  "blogs",
  {
    id: varchar("id", { length: 36 })
      .primaryKey()
      .default(sql`(UUID())`),

    title: varchar("title", { length: 255 }).notNull(),

    code: varchar("code", { length: 100 }).notNull(),

    description: text("description").notNull(),
    image: varchar("image", { length: 255 }),

    createdAt: timestamp("created_at").defaultNow(),
  },
  (table) => ({
    codeUnique: uniqueIndex("blog_code_unique").on(table.code),
  })
);
