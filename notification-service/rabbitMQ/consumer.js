const Notification = require("../model/Notification");
const amqp = require("amqplib");

async function consumerNotification() {
  const amqpServer =
    "amqps://wahhaufo:yTr-nUGY4YKp8Geqq26JMJNeL7yP65vB@armadillo.rmq.cloudamqp.com/wahhaufo";
  connection = await amqp.connect(amqpServer);
  channel = await connection.createChannel();
  await channel.assertQueue("NOTIFICATION_QUEUE", { durable: true });

  channel.consume("NOTIFICATION_QUEUE", async (data) => {
    const { userId, message } = JSON.parse(data.content);
    await Notification.create({ userId, message });
    console.log("====================================");
    console.log("Notification-Consumer::", JSON.parse(data.content));
    channel.ack(data);
  });
}

module.exports = { consumerNotification };
