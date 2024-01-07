const Shop = require("../model/Shop");
const amqp = require("amqplib");

async function consumerCreateProduct() {
  const amqpServer =
    "amqps://wahhaufo:yTr-nUGY4YKp8Geqq26JMJNeL7yP65vB@armadillo.rmq.cloudamqp.com/wahhaufo";

  const nameExchange = "PRODUCT";
  // Create connection
  connection = await amqp.connect(amqpServer);
  // Create channel
  channel = await connection.createChannel();
  // Create exchange
  await channel.assertExchange(nameExchange, "fanout", {
    durable: false,
  });
  // Create queue
  const { queue } = await channel.assertQueue("");
  // Bind queue
  await channel.bindQueue(queue, nameExchange, "");
  channel.consume(queue, async (data) => {
    const { shopId } = JSON.parse(data.content);
    console.log("====================================");
    console.log("Shop-Consumer::", JSON.parse(data.content));
    const shop = await Shop.findById(shopId);
    if (shop) {
      await channel.assertQueue("NOTIFICATION_QUEUE", { durable: true });
      const message = `Shop ${shop.name} vừa có sản phẩm mới hãy ghé xem ngay để không bỏ lỡ nhé !`;
      shop.followers.map((userId) => {
        channel.sendToQueue(
          "NOTIFICATION_QUEUE",
          Buffer.from(JSON.stringify({ userId, shopId, message }))
        );
        console.log(
          "Notification-Create::",
          JSON.stringify({ userId, shopId })
        );
      });
    }
    channel.ack(data);
  });
}

module.exports = { consumerCreateProduct };
