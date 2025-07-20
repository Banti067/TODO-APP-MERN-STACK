const JWT = require("jsonwebtoken");
const userModel = require("../models/userModels"); // adjust path as needed

module.exports = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).send({
        success: false,
        message: "Please provide Auth token",
      });
    }

    const token = authHeader.split(" ")[1];
    const decoded = JWT.verify(token, process.env.JWT_SECRET);

    // ✅ Get the full user from DB
    const user = await userModel.findById(decoded._id).select("-password");
    if (!user) {
      return res.status(401).send({
        success: false,
        message: "User not found",
      });
    }

    req.user = { _id: user._id.toString() };
    next();
  } catch (error) {
    console.log("JWT Middleware Error:", error.message);
    return res.status(401).send({
      success: false,
      message: "Unauthorized or invalid token",
      error: error.message,
    });
  }
};
