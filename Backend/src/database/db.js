import { drizzle } from "drizzle-orm/mysql2";
import { corePool } from "./mysql.js";
import { usersTable } from "../models/user.schema.js";

export const db = drizzle(corePool, {
  schema: {
    usersTable,
  },
  mode: "default",
});
