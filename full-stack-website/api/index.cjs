const products = require("../backend/products");

let orders = [];

const sendJSON = (res, status, data) => {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.end(JSON.stringify(data));
};

const parseJSON = (req) =>
  new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });
    req.on("end", () => {
      if (!body) return resolve({});
      try {
        resolve(JSON.parse(body));
      } catch (error) {
        reject(error);
      }
    });
    req.on("error", reject);
  });

module.exports = async (req, res) => {
  const path = req.url.split("?")[0];

  if (req.method === "OPTIONS") {
    res.statusCode = 204;
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    return res.end();
  }

  if (req.method === "GET" && path === "/api/products") {
    return sendJSON(res, 200, products);
  }

  if (req.method === "GET" && path.startsWith("/api/products/")) {
    const id = Number(path.split("/").pop());
    const product = products.find((item) => item.id === id);
    if (!product) {
      return sendJSON(res, 404, { message: "Product not found" });
    }
    return sendJSON(res, 200, product);
  }

  if (req.method === "GET" && path === "/api/orders") {
    return sendJSON(res, 200, orders);
  }

  if (req.method === "POST" && path === "/api/orders") {
    try {
      const body = await parseJSON(req);
      const { customer, items, total } = body;
      if (!customer || !items || items.length === 0) {
        return sendJSON(res, 400, {
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
      return sendJSON(res, 201, {
        message: "Order placed successfully!",
        order: newOrder,
      });
    } catch (error) {
      return sendJSON(res, 400, { message: "Invalid JSON body" });
    }
  }

  return sendJSON(res, 404, { message: "Route not found" });
};
