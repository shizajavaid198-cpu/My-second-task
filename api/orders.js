const products = require('./full-stack-website/backend/products');

let orders = [];

const sendJSON = (res, status, data) => {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  return res.end(JSON.stringify(data));
};

const parseJSON = (req) =>
  new Promise((resolve, reject) => {
    let body = '';
    req.on('data', (chunk) => (body += chunk));
    req.on('end', () => {
      if (!body) return resolve({});
      try {
        resolve(JSON.parse(body));
      } catch (err) {
        reject(err);
      }
    });
    req.on('error', reject);
  });

module.exports = async (req, res) => {
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(204).end();
  }

  if (req.method === 'GET') {
    return sendJSON(res, 200, orders);
  }

  if (req.method === 'POST') {
    try {
      const body = await parseJSON(req);
      const { customer, items, total } = body;
      if (!customer || !items || items.length === 0) {
        return sendJSON(res, 400, { message: 'Customer and items required' });
      }

      const newOrder = {
        id: orders.length + 1,
        customer,
        items,
        total,
        date: new Date().toISOString(),
      };

      orders.push(newOrder);
      return sendJSON(res, 201, { message: 'Order placed', order: newOrder });
    } catch (err) {
      return sendJSON(res, 400, { message: 'Invalid JSON' });
    }
  }

  return sendJSON(res, 405, { message: 'Method not allowed' });
};
