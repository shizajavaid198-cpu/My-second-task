const products = require('../../full-stack-website/backend/products');

module.exports = (req, res) => {
  const { id } = req.query || {};
  const pid = Number(id || req.url.split('/').pop());
  const product = products.find((p) => p.id === pid);

  if (!product) {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'application/json');
    return res.end(JSON.stringify({ message: 'Product not found' }));
  }

  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(product));
};
