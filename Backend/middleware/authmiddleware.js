import jwt from "jsonwebtoken";

const isauthenticated = (req, res, next) => {
  console.log("Cookies received:", req.cookies); // 🔍 DEBUG LINE

  const token = req.cookies?.token; // ✅ Safe access

  if (!token) {
    return res.status(401).json({
      msg: "Token not present",
      success: false,
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.id = decoded.userId;
    next();
  } catch (error) {
    console.log("JWT error:", error);
    return res.status(401).json({
      msg: "Invalid or expired token",
      success: false,
    });
  }
};

export default isauthenticated;
