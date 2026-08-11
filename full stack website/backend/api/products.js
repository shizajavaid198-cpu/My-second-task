const products = require("../products");

module.exports = (req, res) => {
  res.status(200).json(products);
};