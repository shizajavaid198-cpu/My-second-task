function Navbar({ cartCount }) {
  return (
    <nav className="navbar">
      <h2>ShopEase</h2>

      <ul className="nav-links">
        <li>Home</li>
        <li>Products</li>
        <li>Cart ({cartCount})</li>
        <li>Contact</li>
      </ul>
    </nav>
  );
}

export default Navbar;