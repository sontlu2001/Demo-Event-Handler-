const Shop = require("../model/Shop");

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
      const currentUser = req.userId;
      const shop = await Shop.findOne({ _id: req.body.shopId });
      const userIsFollow = shop.followers.some((userId) => userId == currentUser);
      if (userIsFollow) {
        return res.json({ message: "User already followed this shop" });
      } else {
        shop.followers.push(currentUser);
        shop.save();
        return res.status(200).json({ message: "Follow shop successfully!" });
      }
    } catch (error) {
      return res.json({ message: error });
    }
  }

  async detailById(req, res) {
    const productId = req.params.id;
    if (!productId) {
      return res.status(400).json({ message: "Missing shop id", code: 400 });
    }
    try {
      const shop = await Shop.findOne({ _id: productId });
      return res.status(200).json({ metaData: shop, code: 200 });
    } catch (error) {
      return res.json({ message: error });
    }
  }
}

module.exports = new ShopController();
