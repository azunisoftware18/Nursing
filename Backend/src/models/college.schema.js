import {
  mysqlTable,
  varchar,
  text,
  int,
  json,
  timestamp,
  mysqlEnum,
  index,
} from "drizzle-orm/mysql-core";
import { sql } from "drizzle-orm";

export const collegesTable = mysqlTable(
  "colleges",
  {
    id: varchar("id", { length: 36 })
      .primaryKey()
      .default(sql`(UUID())`),

    name: varchar("name", { length: 255 }).notNull(),
    code: varchar("code", { length: 100 }).notNull().unique(),

    description: text("description"),

    sector: mysqlEnum("sector", ["Private", "Government", "Semi-Govt"])
      .default("Private"),

    genderAcceptance: mysqlEnum("gender_acceptance", [
      "Co-ed",
      "Boys",
      "Girls",
    ]).default("Co-ed"),

    establishedYear: int("established_year"),

    state: varchar("state", { length: 100 }),
    district: varchar("district", { length: 100 }),
    city: varchar("city", { length: 100 }),
    address: text("address"),

    googleMapLink: text("google_map_link"),

    affiliation: text("affiliation"),
    approvedBy: text("approved_by"),

    coursesCount: int("courses_count"),
    experienceYears: int("experience_years"),
    studentsCount: int("students_count"),

    facilities: json("facilities").default([]),
    gallery: json("gallery").default([]),

    thumbnail: varchar("thumbnail", { length: 255 }),
    youtubeVideo: text("youtube_video"),

    courseIds: json("course_ids").default(sql`(JSON_ARRAY())`),
    createdAt: timestamp("created_at").defaultNow(),
  },

  (table) => ({
    nameIndex: index("college_name_idx").on(table.name),
    cityIndex: index("college_city_idx").on(table.city),
    codeIndex: index("college_code_idx").on(table.code),
  })
);
