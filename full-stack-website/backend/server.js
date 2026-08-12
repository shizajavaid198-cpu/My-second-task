module.exports = app;
const express = require("express");
const cors = require("cors");
const products = require("./products"); // Check karein ke file ka naam bilkul exact products.js ho (lowercase)

const app = express();

// CORS Settings - Browser requests allow karne ke liye
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

// Home Route (Health Check)
app.get("/", (req, res) => {
  res.send("ShopEase Backend is live and running!");
});

// Get all products
app.get("/api/products", (req, res) => {
  res.json(products);
});

// Get single product
app.get("/api/products/:id", (req, res) => {
  const product = products.find(
    (p) => String(p.id) === String(req.params.id)
  );

  if (!product) {
    return res.status(404).json({
      message: "Product not found",
    });
  }

  res.json(product);
});

// Orders Memory Array
let orders = [];

// Place an order
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

// Get all orders
app.get("/api/orders", (req, res) => {
  res.json(orders);
});

// Port configuration for Live Hosting
const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`ShopEase Backend running on port ${PORT}`);
});