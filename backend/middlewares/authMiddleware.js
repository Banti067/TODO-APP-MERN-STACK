const JWT = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    // Get token from Authorization header
    const token = req.headers["authorization"]?.split(" ")[1];

    if (!token) {
      return res.status(401).send({
        success: false,
        message: "Please provide Auth token",
      });
    }

    JWT.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).send({
          success: false,
          message: "Un-Authorize user",
        });
      } else {
        req.user = decoded; // set user info in request
        next();
      }
    });
  } catch (error) {
    console.log("Middleware error:", error);
    res.status(400).send({
      success: false,
      message: "Auth middleware error",
      error,
    });
  }
};
