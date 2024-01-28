const express = require("express");
const authMiddleware = require("./middleware/authMiddleware");
const notificationController = require("./controller/notificationController");
const router = express.Router();

router.get("/getAllNotifications", authMiddleware, notificationController.getNotificationByUser);
module.exports = router;
