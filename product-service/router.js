const express = require("express");
const router = express.Router();
const productController = require("./controller/productController");
const authMiddleware = require("./middleware/authMiddleware");

router.get("/getProductsByShop/:shopId", authMiddleware, productController.getProductsByShop);
router.get("/:id", productController.getDetailById);
router.post("/", authMiddleware, productController.create);

module.exports = router;
