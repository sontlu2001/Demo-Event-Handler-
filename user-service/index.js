const express = require("express");
const app = express();
const PORT = 7001;
require("dotenv").config();
const mongoose = require("mongoose");

mongoose.connect(
  "mongodb://127.0.0.1:27017/AuthService",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log(`User-Service DB Connected`);
  }
);

app.use(express.json());

app.use("", require("./router"));

app.listen(PORT, () => {
  console.log(`User-Service at ${PORT}`);
});
