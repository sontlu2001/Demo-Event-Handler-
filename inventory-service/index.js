const express = require("express");
const app = express();
const PORT = 7004;
const mongoose = require("mongoose");
const { consumerInventory } = require("./rabbitMQ/consumer");

app.use(express.json());
mongoose.connect(
  "mongodb://127.0.0.1:27017/InventoryService",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log(`Inventory-Service DB Connected`);
  }
);

consumerInventory();

app.listen(PORT, () => {
  console.log(`Inventory-Service at ${PORT}`);
});
