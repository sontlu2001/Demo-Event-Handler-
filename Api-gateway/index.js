const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const cors = require('cors');

const app = express();
app.use(cors());

const userServiceProxy = createProxyMiddleware({
  target: "http://localhost:7001/",
  pathRewrite: {
    "^/user-service": "",
  },
});

const shopServiceProxy = createProxyMiddleware({
  target: "http://localhost:7002/",
  pathRewrite: {
    "^/shop-service": "",
  },
});

const productServiceProxy = createProxyMiddleware({
  target: "http://localhost:7003/",
  pathRewrite: {
    "^/product-service": "",
  },
});

const inventoryServiceProxy = createProxyMiddleware({
  target: "http://localhost:7004",
  pathRewrite: {
    "^/inventory-service": "",
  },
});

const notificationServiceProxy = createProxyMiddleware({
  target: "http://localhost:7005",
  pathRewrite: {
    "^/notification-service": "",
  },
});

// Định tuyến các yêu cầu tới các dịch vụ tương ứng
app.use("/user-service/*", userServiceProxy); // http://localhost:7001
app.use("/shop-service/*", shopServiceProxy); // http://localhost:7002
app.use("/product-service/*", productServiceProxy); // http://localhost:7003
app.use("/inventory-service/*", inventoryServiceProxy); // http://localhost:7004
app.use("/notification-service/*", notificationServiceProxy); // http://localhost:7005

const PORT = 7000;
app.listen(PORT, () => {
  console.log(`API Gateway is running on port ${PORT}`);
});
