const JWT = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    // 1. Check if Authorization header exists and has Bearer token
    const authHeader = req.headers["authorization"];
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).send({
        success: false,
        message: "Please provide Auth token",
      });
    }

    // 2. Extract token
    const token = authHeader.split(" ")[1];

    // 3. Verify token
    const decoded = JWT.verify(token, process.env.JWT_SECRET);

    // 4. Store user info in request object
    req.user = decoded;

    // 5. Call next middleware/controller
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
