## Deployment and API Notes for ShopEase Full-Stack Website

Quick steps to redeploy and verify API endpoints on Vercel:

1. Build the frontend

```bash
cd full-stack-website
npm install
npm run build
```

2. Deploy with Vercel (interactive):

```bash
npx vercel --prod
```

3. Important endpoints (after deploy):

- `GET /api/products` → returns product list
- `GET /api/products/:id` → product details
- `GET /api/orders` → list orders (in-memory)
- `POST /api/orders` → place an order (JSON body)

Notes:
- Serverless functions are located under `api/` at the repository root for Vercel.
- Orders are kept in-memory (demo). For persistent storage, integrate a DB.
Redeploy trigger: 2026-08-14T00:00:00Z
