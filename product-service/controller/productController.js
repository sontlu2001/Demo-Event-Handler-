const Product = require("../model/Product");
const { publisherCreateProduct } = require("../rabbitMQ/publisher");
const axios = require("axios");

class ProductController {
    async create(req, res) {
        const { name, description, buyingPrice, sellingPrice, shopId, quantity } = req.body;
        const newProduct = await Product.create({
            name,
            description,
            buyingPrice,
            sellingPrice,
            shopId,
            quantity: quantity || 0,
        });
        if (newProduct) {
            console.log("newProduct:: ", newProduct);
            publisherCreateProduct(newProduct._id, newProduct.shopId, quantity);
            return res
                .status(200)
                .json({ message: " Create product successfully!", data: newProduct });
        }
    }

    async getDetailById(req, res) {
        const productId = req.params.id;
        const product = await Product.findOne({ _id: productId });
        if (!product) {
            return res.status(404).json({ message: 'Product not found!', code: 404 });
        }

        const shopResponse = await axios.get(`http://localhost:7000/shop-service/${product.shopId}`)
        if (shopResponse.data && shopResponse.data.metaData) {
            const productDetail = {
                ...product.toObject(),
                shopInfo: shopResponse.data.metaData,
            };
            return res.status(200).json({
                message: 'Get product successfully!',
                metaData: productDetail,
                code: 200,
            });
        }
        else {
            return res.status(404).json({ message: 'Shop not found!', code: 404 });
        }
    }
}

module.exports = new ProductController();