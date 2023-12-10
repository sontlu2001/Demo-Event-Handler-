const jwt = require("jsonwebtoken");

module.exports = async function isAuthenticated(req, res, next) {
  try {
    const token = req.headers["authorization"];

    if (!token || !token.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const tokenValue = token.split(" ")[1];

    jwt.verify(tokenValue, "secret", (err, user) => {
      if (err) {
        return res.status(401).json({ message: "Unauthorized" });
      } else {
        req.user = user;
        next();
      }
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
