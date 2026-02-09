import { randomUUID } from "node:crypto";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";

import { db } from "../db.js";
import { usersTable } from "../../models/user.schema.js";

console.log("🚀 Seed file started...");

(async () => {
  try {
    const email = "admin@nursing.com";

    console.log("🔍 Checking existing user...");

    const existing = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email));

    if (existing.length > 0) {
      console.log("⚠️ Admin already exists");
      process.exit(0);
    }

    const hash = await bcrypt.hash("admin@123", 10);

    await db.insert(usersTable).values({
      id: randomUUID(),
      username: "admin",
      firstName: "Nursing",
      lastName: "Admin",
      email,
      password: hash,
      role: "admin",
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    console.log("✅ Admin created successfully");
    process.exit(0);
  } catch (err) {
    console.error("❌ Seed error:", err);
    process.exit(1);
  }
})();
