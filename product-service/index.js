const express = require("express");
const app = express();
const PORT = 7002;
const mongoose = require("mongoose");
const Product = require("./model/Product");
const jwt = require("jsonwebtoken");
const amqp = require("amqplib");
const multer = require('multer');
const isAuthenticated = require("./middleware/isAuthenticated");

var order, channel, connection;
const upload = multer({ dest: 'uploads/' });

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

async function addNewImageProduct(req, res, next) {
  const message = JSON.stringify({req, res,next});
  console.log(message);
  // const amqpServer =
  //   "amqps://wahhaufo:yTr-nUGY4YKp8Geqq26JMJNeL7yP65vB@armadillo.rmq.cloudamqp.com/wahhaufo";
  // connection = await amqp.connect(amqpServer);
  // channel = await connection.createChannel();
  // await channel.assertQueue("product_image_queue", { durable: false });

  // channel.sendToQueue(queue, Buffer.from(message));
  // console.log(`Sent message to RabbitMQ for product: ${product.id}`);
  next();
}


app.post("/product/buy", isAuthenticated, async (req, res) => {
  const { orders } = req.body;
  let orderTotal = 0;

  try {
    for (const order of orders) {
      const { id, quantity } = order;

      const product = await Product.findOne({ _id: id });

      // Check product exist
      if (!product) {
        return res
          .status(404)
          .json({ message: `Product with ID ${id} not found` });
      }

      // check product quantity
      if (!(await checkStockAvailability(id, quantity))) {
        return res
          .status(401)
          .json({ message: `Not enough products for product ID ${id}` });
      }
      // Calculate order total
      orderTotal += product.price * quantity;
    }
    // Sent message to order service
    channel.sendToQueue(
      "ORDER",
      Buffer.from(
        JSON.stringify({
          orders,
          orderTotal,
          userEmail: req.user.email,
        })
      )
    );
    console.log("Product-Service:: Sent message to queue ORDER");
    return res.status(200).json({ message: "Order successfully!" });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

async function checkStockAvailability(productId, quantityToOrder) {
  const product = await Product.findOne({ _id: { $in: productId } });
  return product.quantity >= quantityToOrder ? true : false;
}

app.post("/product", isAuthenticated,addNewImageProduct, async (req, res) => {
  // Lấy đường dẫn tới ảnh sau khi tải lên từ req.file.path
  const imageUrl = req.file.path;
  console.log(imageUrl);
  // const { name, description,title, price, quantity } = req.body;
  // const newProduct = new Product({
  //   name,
  //   description,
  //   price,
  //   quantity,
  // });
  // newProduct.save();
  // return res.status(200).json({ message: " Create product successfully!", data: newProduct });
});

app.listen(PORT, () => {
  console.log(`Files-Service at ${PORT}`);
});
