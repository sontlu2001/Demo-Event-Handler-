const express = require("express");
const app = express();
const PORT = 7002;
const mongoose = require("mongoose");
const Order = require("./model/Order");
const amqp = require("amqplib");
const isAuthenticated = require("./middleware/isAuthenticated.js");

var channel, connection;

mongoose.connect(
  "mongodb://127.0.0.1:27017/OrderService",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log(`Order-Service DB Connected`);
  }
);
app.use(express.json());

function createOrder(orders, orderTotal, userEmail) {
  const newOrder = new Order({
    orders,
    user: userEmail,
    total_price: orderTotal,
  });
  newOrder.save();
  return newOrder;
}

async function connect() {
  const amqpServer =
    "amqps://wahhaufo:yTr-nUGY4YKp8Geqq26JMJNeL7yP65vB@armadillo.rmq.cloudamqp.com/wahhaufo";
  connection = await amqp.connect(amqpServer);
  channel = await connection.createChannel();
  await channel.assertQueue("ORDER");
}
connect().then(() => {
  channel.consume("ORDER", (data) => {
    const { orders, orderTotal, userEmail } = JSON.parse(data.content);
    console.log("Order-Service::", JSON.parse(data.content));
    const newOrder = createOrder(orders, orderTotal, userEmail);
    channel.ack(data);
  });
});

app.listen(PORT, () => {
  console.log(`Order-Service at ${PORT}`);
});
