const express = require("express");
const app = express();
const PORT = 7003;
const mongoose = require("mongoose");

app.use(express.json());
app.use("", require("./router"));

mongoose.connect(
  "mongodb://127.0.0.1:27017/ProductService",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log(`Product-Service DB Connected`);
  }
);

app.listen(PORT, () => {
  console.log(`Product-Service at ${PORT}`);
});
