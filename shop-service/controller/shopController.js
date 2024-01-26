const Shop = require("../model/Shop");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

class ShopController {
  async register(req, res) {
    const userId = req.userId;
    const { email, name, address, phoneNumber } = req.body;
    const newShop = new Shop({ email, name, address, userId, phoneNumber });
    newShop.save();
    return res.status(200).json({
      message: "Created shop successfully!",
      metaData: newShop,
    });
  }

  async follow(req, res) {
    try {
      const userId = req.userId;
      const shop = await Shop.findOne({ _id: req.body.shopId });
      const userExists = shop.followers.find((userId) => userId == userId);
      if (userExists) {
        return res.json({ message: "User already followed this shop" });
      } else {
        shop.followers.push(userId);
        shop.save();
        return res.status(200).json({ message: "Follow shop successfully!" });
      }
    } catch (error) {
      return res.json({ message: error });
    }
  }

  async getShopById(req,res){
    const id = req.params.id;
    if (!id)
    return res.status(400).json({
      message: "Bad request"
    })
    const shop = Shop.findById(id);
    return res.status(200).json({
      metaData:shop
    })
  }
}

module.exports = new ShopController();
