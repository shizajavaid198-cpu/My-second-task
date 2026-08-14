import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/products")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        return response.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Unable to load products.");
        setLoading(false);
      });
  }, []);

  const addToCart = (product) => {
    setCart((currentCart) => [...currentCart, product]);
  };

  const removeFromCart = (index) => {
    setCart((currentCart) =>
      currentCart.filter((_, i) => i !== index)
    );
  };

  return (
    <>
      {/* HEADER */}
      <header>
        <h1>ShopEase</h1>

        <nav>
          <a href="#home">Home</a>
          <a href="#products">Products</a>
          <a href="#cart">Cart ({cart.length})</a>
          <a href="#admin">Admin</a>
        </nav>
      </header>

      {/* HERO */}
      <section id="home" className="hero">
        <h2>Welcome to ShopEase</h2>

        <p>
          Your one-stop shop for electronics and modern gadgets.
        </p>

        <a href="#products">
          <button>Shop Now</button>
        </a>
      </section>

      {/* PRODUCTS */}
      <section id="products" className="products-section">
        <h2>Our Products</h2>

        {loading && <p style={{ textAlign: "center" }}>Loading products...</p>}

        {error && (
          <p style={{ textAlign: "center", color: "red" }}>
            {error}
          </p>
        )}

        {!loading && !error && (
          <div className="product-grid">
            {products.map((product) => (
              <div className="product-card" key={product.id}>
                <img
                  src={product.image}
                  alt={product.title}
                  onError={(e) => {
                    e.target.src =
                      "https://placehold.co/500x300?text=Product";
                  }}
                />

                <h3>{product.title}</h3>

                <p className="category">
                  {product.category}
                </p>

                <p className="price">
                  Rs.{" "}
                  {Number(product.price).toLocaleString("en-PK")}
                </p>

                <button
                  onClick={() => addToCart(product)}
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* CART */}
      <section id="cart" className="cart-section">
        <h2>Your Cart ({cart.length})</h2>

        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            {cart.map((item, index) => (
              <div
                className="cart-item"
                key={`${item.id}-${index}`}
              >
                <div>
                  <strong>{item.title}</strong>
                  <p>
                    Rs.{" "}
                    {Number(item.price).toLocaleString("en-PK")}
                  </p>
                </div>

                <button
                  onClick={() => removeFromCart(index)}
                >
                  Remove
                </button>
              </div>
            ))}
          </>
        )}
      </section>

      {/* ADMIN */}
      <section id="admin" className="admin-page">
        <h1>Admin Panel</h1>

        <p className="admin-subtitle">
          Manage ShopEase products and orders.
        </p>

        <div className="no-orders">
          <h2>ShopEase Administration</h2>
          <p>Products and orders can be managed here.</p>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <p>© 2026 ShopEase. All Rights Reserved.</p>
      </footer>
    </>
  );
}

export default App;