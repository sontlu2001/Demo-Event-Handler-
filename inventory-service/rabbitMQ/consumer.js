const Inventory = require("../model/Inventory");
const amqp = require("amqplib");

async function consumerProductCreate() {
  const amqpServer =
    "amqps://wahhaufo:yTr-nUGY4YKp8Geqq26JMJNeL7yP65vB@armadillo.rmq.cloudamqp.com/wahhaufo";
  const nameExchange = "PRODUCT";
  const productQueue = "PRODUCT_QUEUE";
  // Create connection
  connection = await amqp.connect(amqpServer);
  // Create channel
  channel = await connection.createChannel();
  // Create exchange
  await channel.assertExchange(nameExchange, "fanout", {
    durable: false,
  });
  // Create queue
  const { queue } = await channel.assertQueue(productQueue);
  // Bind queue
  await channel.bindQueue(queue, nameExchange, "");
  await channel.consume(
    queue,
    async (data) => {
      const { productId, quantity } = JSON.parse(data.content);
      await Inventory.findOneAndUpdate(
        {
          productId,
        },
        { $set: { quantity } },
        { upsert: true }
      );
      console.log("====================================");
      console.log("Inventory-Consumer::", JSON.parse(data.content));
    },
    {
      noAck: true,
    }
  );
}

module.exports = { consumerProductCreate };
