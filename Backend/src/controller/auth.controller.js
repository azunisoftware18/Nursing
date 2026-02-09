import { loginService } from "../services/auth.service.js";
import { createAuditLog } from "../services/audit.service.js";

export async function login(req, res) {
  try {
    const result = await loginService(req.body);

    res.cookie("token", result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });

    await createAuditLog({
      action: "LOGIN",
      module: "Auth",
      description: `User logged in: ${result.user.email}`,
      userAgent: req.headers["user-agent"],
    });

    res.json({
      success: true,
      message: "Login successful",
      user: result.user,
    });

  } catch (error) {

    await createAuditLog({
      action: "FAILED_LOGIN",
      module: "Auth",
      description: `Failed login attempt: ${req.body.email}`,
      userAgent: req.headers["user-agent"],
    });

    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}
