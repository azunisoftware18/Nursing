import { mysqlTable, varchar, timestamp } from "drizzle-orm/mysql-core";
import { sql } from "drizzle-orm";

export const leadsTable = mysqlTable("leads", {
  id: varchar("id", { length: 36 })
    .primaryKey()
    .default(sql`(UUID())`),

  name: varchar("name", { length: 150 }),
  email: varchar("email", { length: 150 }),
  phone: varchar("phone", { length: 20 }).notNull(),

  state: varchar("state", { length: 100 }),
  city: varchar("city", { length: 100 }),
  course: varchar("course", { length: 150 }),
  college: varchar("college", { length: 150 }),

  message: varchar("message", { length: 500 }),

  createdAt: timestamp("created_at").defaultNow(),
});
