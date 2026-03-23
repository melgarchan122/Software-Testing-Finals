<div className="products-grid">
  {filteredProducts.map((product) => (
    <div key={product._id} className="product-card">
      {/* Clickable area for product details - separate div */}
      <div
        className="product-clickable"
        onClick={() => navigate(`/products/${product._id}`)}
      >
        <div className="product-image-container">
          <img
            src={product.image}
            alt={product.name}
            className="product-image"
          />
          <div className="product-category-badge">
            {product.category || "Electronics"}
          </div>
        </div>
        <div className="product-info">
          <h3>{product.name}</h3>
          <p className="description">{product.description}</p>
          <div className="product-rating">No reviews yet</div>
          <div className="product-price">${product.price.toFixed(2)}</div>
        </div>
      </div>

      {/* BUY NOW button - separate click, hindi magri-redirect */}
      <button
        className="btn-buy-now"
        onClick={(e) => {
          e.stopPropagation();
          handleAddToCart(e, product);
        }}
      >
        BUY NOW
      </button>

      <div className="stock-badge">
        {product.countInStock > 0
          ? `${product.countInStock} in stock`
          : "Out of stock"}
      </div>
    </div>
  ))}
</div>;
