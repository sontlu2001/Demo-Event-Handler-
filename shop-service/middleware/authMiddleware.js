// authMiddleware.js
const jwt = require("jsonwebtoken");
const secretKey = "secret";

const authMiddleware = (req, res, next) => {
  const token = req.headers?.authorization;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
    req.userId = decoded.userId;
    next();
  });
};

module.exports = authMiddleware;
