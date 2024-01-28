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
        shop.followers = shop.followers.filter((userId) => userId != currentUser);
        shop.save();
        return res.json({ code: 200, message: "Đã bỏ theo dõi shop!" });
      } else {
        shop.followers.push(currentUser);
        shop.save();
        return res.status(200).json({ code: 200, message: "Theo dõi shop thành công!" });
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

  async detailByUser(req, res) {

    const userId = req.userId;
    if (!userId) {
      return res.status(401).json({ message: 'Not Unauthorize', code: 401 });
    }
    try {
      const shop = await Shop.findOne({ userId: userId });
      return res.status(200).json({ metaData: shop, code: 200 });
    } catch (error) {
      return res.json({ message: error });
    }
  }
}

module.exports = new ShopController();
