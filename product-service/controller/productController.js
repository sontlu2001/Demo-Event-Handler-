const { response } = require("express");
const Product = require("../model/Product");
const { publisherCreateProduct } = require("../rabbitMQ/publisher");
const axios = require("axios");

class ProductController {
    async create(req, res) {
        const { name, description, buyingPrice, sellingPrice, shopId, quantity, urlImage = '' } = req.body;
        const newProduct = await Product.create({
            name,
            description,
            buyingPrice,
            sellingPrice,
            shopId,
            quantity: quantity || 0,
            urlImage,
        });
        if (newProduct) {
            publisherCreateProduct(newProduct._id, newProduct.shopId, quantity);
            return res
                .status(200)
                .json({ message: " Create product successfully!", data: newProduct });
        }
    }

    async getDetailById(req, res) {
        try {
            const productId = req.params.id;
            const userId = req.userId;


            const product = await Product.findOne({ _id: productId });
            if (!product) {
                return res.status(404).json({ message: 'Product not found!', code: 404 });
            }

            const [shopResponse, inventoryResponse] = await Promise.all([
                axios.get(`http://localhost:7000/shop-service/${product.shopId}`),
                axios.get(`http://localhost:7000/inventory-service/getQuantity/${product._id}`)
            ]);
            let productResult = { ...product.toObject() };

            if (inventoryResponse.data && inventoryResponse.data.metaData) {
                productResult.quantity = inventoryResponse.data.metaData.quantity;
            }

            if (shopResponse.data && shopResponse.data.metaData) {
                if (userId) {
                    productResult.isFollow = shopResponse.data.metaData.followers.includes(userId);
                }
                productResult.shopInfo = shopResponse.data.metaData;
            }

            return res.status(200).json({
                message: 'Get product successfully!',
                metaData: productResult,
                code: 200,
            });
        } catch (error) {
            console.log(error);
        }

    }

    async getProductsByShop(req, res) {
        const shopId = req.params.shopId;
        const listProduct = await Product.find({ shopId: shopId }, (err, products) => {
            if (err) {
                return res.status(500).json({ message: 'Internal server error!', code: 500 });
            }
        }).lean().exec();

        for (const product of listProduct) {
            try {
                const response = await axios.get(`http://localhost:7000/inventory-service/getQuantity/${product._id}`)
                if (response.data && response.data.metaData) {
                    product.quantity = response.data.metaData.quantity;
                }
            }
            catch (error) {
                console.log("error:: ", error);
            }
        }
        return res.status(200).json({
            message: 'Get products successfully!',
            metaData: listProduct,
            code: 200,
        });
    }

    async delete(req, res) {
        const productId = req.params.id;
        await Product.deleteOne({ _id: productId }, (err) => {
            if (err) {
                return res.status(500).json({ message: 'Internal server error!', code: 500 });
            } else {
                return res.status(200).json({ message: 'Delete product successfully!', code: 200 });
            }
        });
    }

    async getAll(req, res) {
        const listProduct = await Product.find({}, (err, products) => {
            if (err) {
                return res.status(500).json({ message: 'Internal server error!', code: 500 });
            }
        }).select('name sellingPrice urlImage');

        return res.status(200).json({
            message: 'Get products successfully!',
            metaData: listProduct,
            code: 200,
        });
    }
}

module.exports = new ProductController();