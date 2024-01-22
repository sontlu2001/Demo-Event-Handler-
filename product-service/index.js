const express = require("express");
const app = express();
const PORT = 7003;
const mongoose = require("mongoose");
const Product = require("./model/Product");
const amqp = require("amqplib");
const authMiddleware = require("./middleware/authMiddleware");
const { publisherCreateProduct } = require("./rabbitMQ/publisher");

app.use(express.json());
mongoose.connect(
  "mongodb://127.0.0.1:27017/ProductService",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log(`Product-Service DB Connected`);
  }
);

let channel,
  connection = null;

async function connect() {
  const amqpServer =
    "amqps://wahhaufo:yTr-nUGY4YKp8Geqq26JMJNeL7yP65vB@armadillo.rmq.cloudamqp.com/wahhaufo";
  connection = await amqp.connect(amqpServer);
  channel = await connection.createChannel();
  await channel.assertQueue("PRODUCT_CREATE_QUEUE", { durable: true });
}
connect();

app.post("/product", authMiddleware, async (req, res) => {
  const {name,description,buyingPrice,sellingPrice,shopId,quantity} = req.body;
  
  const newProduct = await Product.create({
    name,
    description,
    buyingPrice,
    sellingPrice,
    shopId,
    quantity : quantity || 0,
  });
  if (newProduct) {
    console.log(newProduct, "newProduct");
    publisherCreateProduct(newProduct._id, newProduct.shopId, quantity);
    return res
      .status(200)
      .json({ message: " Create product successfully!", data: newProduct });
  }
});

app.listen(PORT, () => {
  console.log(`Product-Service at ${PORT}`);
});
