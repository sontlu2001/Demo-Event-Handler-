const express = require("express");
const router = express.Router();
const productController = require("./controller/productController");
const {authMiddleware,isLogin} = require("./middleware/authMiddleware");

router.get("/getProductsByShop/:shopId", authMiddleware, productController.getProductsByShop);
router.get("/getAllProducts", productController.getAll);
router.get("/:id",isLogin, productController.getDetailById);
router.post("/", authMiddleware, productController.create);
router.delete("/:id", authMiddleware, productController.delete);
module.exports = router;
