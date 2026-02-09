import jwt from "jsonwebtoken";

export function verifyToken(req, res, next) {
  try {
    let token = req.headers.authorization?.split(" ")[1];

    if (!token && req.cookies?.token) {
      token = req.cookies.token;
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Authentication token missing",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
}

export function isAdmin(req, res, next) {
  if (req.user?.role !== "admin") {
    return res.status(403).json({
      success: false,
      message: "Admin access only",
    });
  }
  next();
}
