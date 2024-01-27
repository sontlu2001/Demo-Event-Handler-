const Notification = require("../model/Notification");
const amqp = require("amqplib");
const notificationController = require("../controller/notificationController");

async function consumerNotification() {
  const amqpServer =
    "amqps://wahhaufo:yTr-nUGY4YKp8Geqq26JMJNeL7yP65vB@armadillo.rmq.cloudamqp.com/wahhaufo";
  connection = await amqp.connect(amqpServer);
  channel = await connection.createChannel(); 
  // Tạo queue NOTIFICATION_QUEUE
  await channel.assertQueue("NOTIFICATION_QUEUE", { durable: true });
  // Nhận message từ queue NOTIFICATION_QUEUE
  channel.consume("NOTIFICATION_QUEUE", async (data) => {
    const { shopId } = JSON.parse(data.content);
    notificationController.newProduct(shopId);
    console.log("====================================");
    console.log("Notification-Consumer::", JSON.parse(data.content));
    channel.ack(data);
  });
}

module.exports = { consumerNotification };
