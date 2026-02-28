import { db } from "../database/db.js";
import { usersTable } from "../models/user.schema.js";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { createAuditLog } from "../services/audit.service.js";

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
    const {
      firstName,
      lastName,
      username,
      email,
      currentPassword,
      newPassword,
    } = req.body;

    if (!firstName || !lastName || !username || !email) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (!currentPassword) {
      return res.status(400).json({
        success: false,
        message: "Current password is required",
      });
    }

    if (newPassword && newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: "New password must be at least 6 characters",
      });
    }

    const [user] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.id, userId));

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(
      currentPassword,
      user.password
    );

    if (!isMatch) {
      await createAuditLog({
        action: "FAILED_PROFILE_UPDATE",
        module: "User",
        description: `Incorrect current password attempt by ${user.email}`,
        userAgent: req.headers["user-agent"],
      });

      return res.status(400).json({
        success: false,
        message: "Current password is incorrect",
      });
    }

    const updateData = {
      firstName,
      lastName,
      username,
      email,
    };

    if (newPassword) {
      updateData.password = await bcrypt.hash(newPassword, 10);
    }

    await db
      .update(usersTable)
      .set(updateData)
      .where(eq(usersTable.id, userId));

    // ✅ SUCCESS AUDIT LOG
    await createAuditLog({
      action: "UPDATE_PROFILE",
      module: "User",
      description: `User profile updated: ${user.email}`,
      userAgent: req.headers["user-agent"],
    });

    return res.json({
      success: true,
      message: "Profile updated successfully",
    });

  } catch (error) {

    await createAuditLog({
      action: "ERROR_PROFILE_UPDATE",
      module: "User",
      description: `Profile update error for userId ${req.user?.id}`,
      userAgent: req.headers["user-agent"],
    });

    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};