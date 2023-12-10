const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();

const authServiceProxy = createProxyMiddleware({
  target: "http://localhost:7001/",
  pathRewrite: {
    "^/auth-service": "",
  },
});
const orderServiceProxy = createProxyMiddleware({
  target: "http://localhost:7002",
  pathRewrite: {
    "^/order-service": "",
  },
});

const productServiceProxy = createProxyMiddleware({
  target: "http://localhost:7003",
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

// Định tuyến các yêu cầu tới các dịch vụ tương ứng
app.use("/auth-service/*", authServiceProxy);
app.use("/order-service/*", orderServiceProxy);
app.use("product-service", productServiceProxy);
app.use("/inventory-service/*", inventoryServiceProxy);

const PORT = 7000;
app.listen(PORT, () => {
  console.log(`API Gateway is running on port ${PORT}`);
});
