const amqp = require("amqplib");

async function publisherCreateProduct(productId, shopId, quantity) {
  const amqpServer =
    "amqps://wahhaufo:yTr-nUGY4YKp8Geqq26JMJNeL7yP65vB@armadillo.rmq.cloudamqp.com/wahhaufo";
  // Create connection
  connection = await amqp.connect(amqpServer);
  // Create channel
  channel = await connection.createChannel();
  // Create exchange
  await channel.assertExchange("PRODUCT", "fanout", {
    durable: false,
  });
  // Publish message to exchange
  await channel.publish(
    "PRODUCT",
    "PRODUCT_QUEUE",
    Buffer.from(JSON.stringify({ productId, shopId, quantity }))
  );
  console.log("====================================");
  console.log("Publisher::", JSON.stringify({ productId, shopId, quantity }));
}

module.exports = { publisherCreateProduct };
