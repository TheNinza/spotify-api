const { API_ACCESS_KEY } = require("../configs/environments");

exports.verifyApiAccess = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization; // Bearer <token>
    if (authHeader.startsWith("Bearer ")) {
      const token = authHeader.split(" ")[1];
      if (token !== API_ACCESS_KEY) {
        throw new Error("Invalid API key");
      } else {
        next();
      }
    } else {
      throw new Error("Invalid API key");
    }
  } catch (error) {
    res.status(401).json({
      message: "Invalid API key",
    });
  }
};
