const express = require("express");
const app = express();
const PORT = 7005;
const mongoose = require("mongoose");
const amqp = require("amqplib");
const { consumerNotification } = require("./rabbitMQ/consumer");

mongoose.connect(
  "mongodb://127.0.0.1:27017/NotificationService",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log(`Notification-Service DB Connected`);
  }
);

app.use(express.json());
app.use("", require("./router"));
consumerNotification();

app.listen(PORT, () => {
  console.log(`Notification-Service at ${PORT}`);
});
