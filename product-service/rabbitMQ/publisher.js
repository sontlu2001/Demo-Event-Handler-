const amqp = require("amqplib");

async function publisherCreateProduct(productId, shopId, quantity) {
  const amqpServer =
    "amqps://wahhaufo:yTr-nUGY4YKp8Geqq26JMJNeL7yP65vB@armadillo.rmq.cloudamqp.com/wahhaufo";
  // Create connection
  connection = await amqp.connect(amqpServer);
  // Create channel
  channel = await connection.createChannel();
  // Tạo exchange
  await channel.assertExchange("PRODUCT_EXCHANGE", "fanout", {
    durable: false,
  });
  // Publish message tới exchange
  await channel.publish(
    "PRODUCT_EXCHANGE",
    "",
    Buffer.from(JSON.stringify({ productId, shopId, quantity }))
  );
  // Bind queue INVENTORY_QUEUE với exchange
  await channel.bindQueue("INVENTORY_QUEUE", "PRODUCT_EXCHANGE", "");
  // Bind queue NOTIFICATION_QUEUE với exchange
  await channel.bindQueue("NOTIFICATION_QUEUE", "PRODUCT_EXCHANGE", "");

  console.log("====================================");
  console.log("Publisher::", JSON.stringify({ productId, shopId, quantity }));
}

module.exports = { publisherCreateProduct };
