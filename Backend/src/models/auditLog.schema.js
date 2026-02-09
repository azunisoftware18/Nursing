import { mysqlTable, varchar, text, timestamp } from "drizzle-orm/mysql-core";
import { sql } from "drizzle-orm";

export const auditLogsTable = mysqlTable("audit_logs", {
  id: varchar("id", { length: 36 })
    .primaryKey()
    .default(sql`(UUID())`),

  action: varchar("action", { length: 100 }).notNull(),
  module: varchar("module", { length: 100 }).notNull(),
  description: text("description"),
  userAgent: text("user_agent"),

  createdAt: timestamp("created_at").defaultNow(),
});
