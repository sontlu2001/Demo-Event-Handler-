const express = require("express");
const app = express();
const PORT = 7002;
const mongoose = require("mongoose");

mongoose.connect(
  "mongodb://127.0.0.1:27017/ShopService",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log(`Shop-Service DB Connected`);
  }
);

app.use(express.json());
app.use("", require("./router"));

app.listen(PORT, () => {
  console.log(`Shop-Service at ${PORT}`);
});
