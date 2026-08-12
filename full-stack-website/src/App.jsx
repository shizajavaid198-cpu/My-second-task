const BASE_URL = "https://my-second-task-two.vercel.app";

// Fetch me call karein:
fetch(`${BASE_URL}/api/products`)
import { useEffect, useState } from "react";

function Products() {
  const [products, setProducts] = useState([]);

  // 1. Apna Backend Live URL yahan paste karein
  const BASE_URL = "https://your-backend-url.onrender.com"; 

  useEffect(() => {
    // Products fetch karne ka code
    fetch(`${BASE_URL}/api/products`)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.log("Error loading products:", err));
  }, []);

  return (
    <div className="products-container">
      <h1>Products</h1>
      <div className="product-list">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <h3>{product.title}</h3>
            <p>Rs. {product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;