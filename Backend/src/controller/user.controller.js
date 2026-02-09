import { db } from "../database/db.js";
import { usersTable } from "../models/user.schema.js";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";

export const getMyProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const [user] = await db
      .select({
        id: usersTable.id,
        username: usersTable.username,
        firstName: usersTable.firstName,
        lastName: usersTable.lastName,
        email: usersTable.email,
        role: usersTable.role,
        isActive: usersTable.isActive,
      })
      .from(usersTable)
      .where(eq(usersTable.id, userId));

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const updateMyProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { firstName, lastName, username, email, password } = req.body;

    const updateData = {
      firstName,
      lastName,
      username,
      email,
    };

    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }

    await db
      .update(usersTable)
      .set(updateData)
      .where(eq(usersTable.id, userId));

    res.json({
      success: true,
      message: "Profile updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};