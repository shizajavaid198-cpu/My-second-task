function ProductCard({ title, price, image, onAddToCart }) {
  return (
    <div className="card">
      <img src={image} alt={title} />

      <h3>{title}</h3>

      <h2>{price}</h2>

      <button onClick={onAddToCart}>
        Add to Cart
      </button>
    </div>
  );
}

export default ProductCard;