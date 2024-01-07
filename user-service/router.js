const express = require("express");
const router = express.Router();
const userController = require("./controller/userController");
const authMiddleware = require("./middleware/authMiddleware");

router.post("/login", userController.login);
router.post("/register", userController.register);

module.exports = router;
