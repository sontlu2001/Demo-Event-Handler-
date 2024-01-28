const express = require("express");
const router = express.Router();
const shopController = require("./controller/shopController");
const authMiddleware = require("./middleware/authMiddleware");

router.post("/register", authMiddleware, shopController.register);
router.post("/follow", authMiddleware, shopController.follow);
router.get("/detail", authMiddleware, shopController.detailByUser);
router.get("/:id", shopController.detailById);

module.exports = router;
