const products = require("../products");

module.exports = (req, res) => {
  res.status(200).json(products);
};git mv "full stack website" full-stack-website