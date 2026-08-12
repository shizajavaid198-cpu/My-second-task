import { useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Admin from "./Admin";

function Home() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [showCheckout, setShowCheckout] = useState(false);
  const [orderMessage, setOrderMessage] = useState("");

  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  // Get products from backend
  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.log("Error:", error));
  }, []);

  // Add to cart
  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  // Remove from cart
  const removeFromCart = (index) => {
    setCart((prevCart) =>
      prevCart.filter((_, i) => i !== index)
    );
  };

  // Customer input
  const handleInputChange = (e) => {
    setCustomer({
      ...customer,
      [e.target.name]: e.target.value,
    });
  };

  // Total
  const total = cart.reduce(
    (sum, item) => sum + Number(item.price),
    0
  );

  // Search + Category Filter
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" ||
      product.category === category;

    return matchesSearch && matchesCategory;
  });

  // Place Order
  const placeOrder = async (e) => {
    e.preventDefault();

    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/orders",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            customer,
            items: cart,
            total,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setOrderMessage(
          `Order #${data.order.id} placed successfully!`
        );

        setCart([]);

        setCustomer({
          name: "",
          email: "",
          phone: "",
          address: "",
        });

        setShowCheckout(false);

        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
      alert("Unable to place order.");
    }
  };

  return (
    <div>
      {/* HEADER */}
      <header>
        <h1>ShopEase</h1>

        <nav>
          <Link to="/">Home</Link>
          <a href="#products">Products</a>
          <a href="#cart">Cart ({cart.length})</a>
          <Link to="/admin">Admin</Link>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      {/* HERO */}
      <section id="home" className="hero">
        <h2>Welcome to ShopEase</h2>
        <p>Best Electronics at Best Prices</p>

        <button
          onClick={() =>
            document
              .getElementById("products")
              .scrollIntoView()
          }
        >
          Shop Now
        </button>
      </section>

      {/* PRODUCTS */}
      <section id="products" className="products-section">
        <h2>Our Electronics</h2>

        {/* SEARCH AND FILTER */}
        <div className="filters">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            value={category}
            onChange={(e) =>
              setCategory(e.target.value)
            }
          >
            <option value="All">All Categories</option>
            <option value="Laptop">Laptop</option>
            <option value="Mobile">Mobile</option>
            <option value="Audio">Audio</option>
            <option value="Watch">Watch</option>
          </select>
        </div>

        {/* PRODUCT CARDS */}
        <div className="product-grid">
          {filteredProducts.length === 0 ? (
            <p>No products found.</p>
          ) : (
            filteredProducts.map((product) => (
              <div
                className="product-card"
                key={product.id}
              >
                <img
                  src={product.image}
                  alt={product.title}
                />

                <h3>{product.title}</h3>

                <p className="category">
                  {product.category}
                </p>

                <p className="price">
                  Rs.{" "}
                  {Number(product.price).toLocaleString(
                    "en-PK"
                  )}
                </p>

                <button
                  onClick={() =>
                    addToCart(product)
                  }
                >
                  Add to Cart
                </button>
              </div>
            ))
          )}
        </div>
      </section>

      {/* CART */}
      <section id="cart" className="cart-section">
        <h2>Shopping Cart</h2>

        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            {cart.map((item, index) => (
              <div
                className="cart-item"
                key={index}
              >
                <span>
                  {item.title} - Rs.{" "}
                  {Number(item.price).toLocaleString(
                    "en-PK"
                  )}
                </span>

                <button
                  onClick={() =>
                    removeFromCart(index)
                  }
                >
                  Remove
                </button>
              </div>
            ))}

            <h3>
              Total: Rs.{" "}
              {total.toLocaleString("en-PK")}
            </h3>

            <button
              className="checkout-button"
              onClick={() =>
                setShowCheckout(true)
              }
            >
              Proceed to Checkout
            </button>
          </>
        )}
      </section>

      {/* CHECKOUT */}
      {showCheckout && (
        <section className="checkout-section">
          <h2>Checkout</h2>

          <form onSubmit={placeOrder}>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={customer.name}
              onChange={handleInputChange}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={customer.email}
              onChange={handleInputChange}
              required
            />

            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={customer.phone}
              onChange={handleInputChange}
              required
            />

            <textarea
              name="address"
              placeholder="Delivery Address"
              value={customer.address}
              onChange={handleInputChange}
              required
            />

            <h3>
              Order Total: Rs.{" "}
              {total.toLocaleString("en-PK")}
            </h3>

            <button type="submit">
              Place Order
            </button>

            <button
              type="button"
              onClick={() =>
                setShowCheckout(false)
              }
            >
              Cancel
            </button>
          </form>
        </section>
      )}

      {/* SUCCESS MESSAGE */}
      {orderMessage && (
        <section className="success-message">
          <h2>🎉 {orderMessage}</h2>
          <p>
            Thank you for shopping with ShopEase!
          </p>
        </section>
      )}

      {/* FOOTER */}
      <footer id="contact">
        <p>
          © 2026 ShopEase | Electronics Store
        </p>
      </footer>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/admin" element={<Admin />} />
    </Routes>
  );
}

export default App;