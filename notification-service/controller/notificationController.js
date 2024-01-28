const Notification = require("../model/Notification");
const axios = require("axios");

class NotificationController {
    newProduct = async (shopId) => {
        try {
            // get all users from shop
            const shop = await axios.get(`http://localhost:7000/shop-service/${shopId}`)
                .then(res => { return res.data.metaData });
            // create notification for all users
            const message = `Shop ${shop.name} vừa có sản phẩm mới hãy ghé xem ngay!`;
            shop.followers.forEach(async (userId) => {
                await Notification.create({ userId, message });
            });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }

    };

    getNotificationByUser = async (req, res) => {
        try {
            const userId = req.userId;
            const unseenCount = await Notification.countDocuments({ userId, isSeen: false });
            const notifications = await Notification.find({ userId }).sort({ createdAt: -1 });
            return res.status(200).json({ code: 200, metaData: notifications, unseenCount });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    };
}

module.exports = new NotificationController();
