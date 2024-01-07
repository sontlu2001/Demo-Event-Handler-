const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  name: String,
  description: String,
  buyingPrice: Number,
  sellingPrice: Number,
  shopId: { type: Schema.Types.ObjectId, ref: "Shop" },
  image_url: [{ type: String, default: [] }],
  thumbnail_url: String,
  created_at: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = Product = mongoose.model("product", ProductSchema);
