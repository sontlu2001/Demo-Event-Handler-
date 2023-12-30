const express = require("express");
const app = express();
const PORT = 7003;
const mongoose = require("mongoose");
const Inventory = require('./inventoryModel');
const jwt = require("jsonwebtoken");
const amqp = require("amqplib");
const isAuthenticated = require("./middleware/isAuthenticated");

var order, channel, connection;

app.use(express.json());
mongoose.connect(
  "mongodb://127.0.0.1:27017/InventoryService",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log(`Product-Service DB Connected`);
  }
);

async function connect() {
  const amqpServer =
    "amqps://wahhaufo:yTr-nUGY4YKp8Geqq26JMJNeL7yP65vB@armadillo.rmq.cloudamqp.com/wahhaufo";
  connection = await amqp.connect(amqpServer);
  channel = await connection.createChannel();
  await channel.assertQueue("INVENTORY");
}
// connect();

app.get("/inventory/:productID", isAuthenticated, async (req, res) => {
  const { productID } = req.params;

  try {
    const product = await Inventory.findOne({ productID });

    if (!product) {
      return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
    }

    return res.json({ product });
  } catch (err) {
    console.error('Lỗi khi tìm kiếm sản phẩm:', err);
    return res.status(500).json({ message: 'Đã xảy ra lỗi khi tìm kiếm sản phẩm' });
  }
});

async function checkStockAvailability(productId, quantityToOrder) {
  const product = await Product.findOne({ _id: { $in: productId } });
  return product.quantity >= quantityToOrder ? true : false;
}

app.post("/product", isAuthenticated, async (req, res) => {
  const { name, description, price, quantity } = req.body;
  const newProduct = new Product({
    name,
    description,
    price,
    quantity,
  });
  newProduct.save();
  return res.status(200).json({ message: " Create product successfully!", data: newProduct });
});

app.listen(PORT, () => {
  console.log(`Product-Service at ${PORT}`);
});
