const express = require("express");
const router = express.Router();
const productController = require("./controller/productController");
const authMiddleware = require("./middleware/authMiddleware");

router.post("/", authMiddleware, productController.create);
router.get("/:id", productController.getDetailById);

module.exports = router;
