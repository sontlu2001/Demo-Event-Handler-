const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ShopSchema = new Schema({
  name: String,
  email: String,
  address: String,
  phoneNumber: String,
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  followers: [{ type: Schema.Types.ObjectId, ref: "User", default: [] }],
  created_at: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = Shop = mongoose.model("shop", ShopSchema);
