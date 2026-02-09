import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { eq } from "drizzle-orm";

import { usersTable } from "../models/user.schema.js";
import { db } from "../database/db.js";

export async function loginService({ email, password }) {
  
  const users = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, email));

  if (users.length === 0) {
    throw new Error("User not found");
  }

  const user = users[0];

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid password");
  }

  const token = jwt.sign(
    {
      id: user.id,
      role: user.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  return {
    token,
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    },
  };
}
