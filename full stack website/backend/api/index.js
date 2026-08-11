const express = require("express");
const cors = require("cors");
const products = require("../products");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("ShopEase Backend Running!");
});

app.get("/api/products", (req, res) => {
  res.json(products);
});

app.get("/api/products/:id", (req, res) => {
  const product = products.find(
    (p) => p.id === Number(req.params.id)
  );

  if (!product) {
    return res.status(404).json({
      message: "Product not found",
    });
  }

  res.json(product);
});

let orders = [];

app.post("/api/orders", (req, res) => {
  const { customer, items, total } = req.body;

  if (!customer || !items || items.length === 0) {
    return res.status(400).json({
      message: "Customer information and cart items are required",
    });
  }

  const newOrder = {
    id: orders.length + 1,
    customer,
    items,
    total,
    date: new Date().toISOString(),
  };

  orders.push(newOrder);

  res.status(201).json({
    message: "Order placed successfully!",
    order: newOrder,
  });
});

app.get("/api/orders", (req, res) => {
  res.json(orders);
});

module.exports = app;