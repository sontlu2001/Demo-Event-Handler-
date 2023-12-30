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
  target: "http://localhost:7004",
  pathRewrite: {
    "^/order-service": "",
  },
});

const productServiceProxy = createProxyMiddleware({
  target: "http://localhost:7002",
  pathRewrite: {
    "^/product-service": "",
  },
});

const inventoryServiceProxy = createProxyMiddleware({
  target: "http://localhost:7003",
  pathRewrite: {
    "^/inventory-service": "",
  },
});

const filesServiceProxy = createProxyMiddleware({
  target: "http://localhost:7005",
  pathRewrite: {
    "^/files-service": "",
  },
});

// Định tuyến các yêu cầu tới các dịch vụ tương ứng
app.use("/auth-service/*", authServiceProxy); // http://localhost:7001
app.use("/order-service/*", orderServiceProxy); // http://localhost:7002
app.use("/product-service/", productServiceProxy); // http://localhost:7003
app.use("/inventory-service/*", inventoryServiceProxy); // http://localhost:7004
app.use("/files-service/*", inventoryServiceProxy);// http://localhost:7005

const PORT = 7000;
app.listen(PORT, () => {
  console.log(`API Gateway is running on port ${PORT}`);
});
