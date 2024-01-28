const Inventory = require("../model/Inventory");
const amqp = require("amqplib");

async function consumerInventory() {
  const amqpServer =
    "amqps://wahhaufo:yTr-nUGY4YKp8Geqq26JMJNeL7yP65vB@armadillo.rmq.cloudamqp.com/wahhaufo";
  connection = await amqp.connect(amqpServer);
  channel = await connection.createChannel();
  // Tạo queue INVENTORY_QUEUE
  await channel.assertQueue("INVENTORY_QUEUE", { durable: true });
  // Nhận message từ queue INVENTORY_QUEUE
  await channel.consume(
    "INVENTORY_QUEUE",
    async (data) => {
      let { productId, quantity } = JSON.parse(data.content);
      if (!quantity) {
        quantity = 0;
      }
      await Inventory.findOneAndUpdate(
        {
          productId,
        },
        { $set: { quantity } },
        { upsert: true }
      );
      console.log("====================================");
      console.log("Inventory-Consumer::", JSON.parse(data.content));
      channel.ack(data);
    });
}

module.exports = { consumerInventory };
