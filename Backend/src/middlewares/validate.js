export const validate = (schema) => (req, res, next) => {
  try {
    console.log("VALIDATE HIT");  
    req.body = schema.parse(req.body);
    next();
  } catch (err) {
    console.log("ZOD ERROR =>", err.errors);

    return res.status(400).json({
      success: false,
      message: err.errors?.[0]?.message || "Validation failed",
    });
  }
};