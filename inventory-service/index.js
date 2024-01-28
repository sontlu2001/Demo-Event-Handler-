const express = require("express");
const app = express();
const PORT = 7004;
const mongoose = require("mongoose");
const { consumerInventory } = require("./rabbitMQ/consumer");
const Inventory = require("./model/Inventory");

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

app.get("/getQuantity/:productId", async (req, res) => {
  const productId = req.params.productId;
  await Inventory.findOne({ productId: productId }, (err, inventory) => {
    if (err) {
      return res.status(500).json({ message: "Internal server error!", code: 500 });
    }
    return res.status(200).json({ message: "Get quantity successfully!", metaData: inventory, code: 200 });;
  });


});

app.listen(PORT, () => {
  console.log(`Inventory-Service at ${PORT}`);
});
