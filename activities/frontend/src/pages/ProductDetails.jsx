import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Card from "../components/Card";
import { useCart } from "../contexts/CartContext";
import "./ProductDetails.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/api/products/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch product");
      }
      const data = await response.json();
      setProduct(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      for (let i = 0; i < quantity; i++) {
        addToCart(product);
      }
      setAddedToCart(true);
      setTimeout(() => setAddedToCart(false), 2000);
    }
  };

  if (loading) {
    return (
      <div className="product-details-container">
        <p>Loading product...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="product-details-container">
        <p className="error">Error: {error}</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="product-details-container">
        <p>Product not found</p>
      </div>
    );
  }

  return (
    <div className="product-details-container">
      <button className="back-button" onClick={() => navigate("/")}>
        ← Back to Products
      </button>

      <Card className="product-details-card">
        <div className="product-details-content">
          <div className="product-image-section">
            <img
              src={product.image}
              alt={product.name}
              className="product-image-large"
            />
          </div>

          <div className="product-info-section">
            <h1>{product.name}</h1>
            <p className="category">{product.category}</p>

            <div className="price-section">
              <h2 className="price">${product.price.toFixed(2)}</h2>
              <span
                className={`stock ${product.countInStock > 0 ? "in-stock" : "out-of-stock"}`}
              >
                {product.countInStock > 0
                  ? `${product.countInStock} in stock`
                  : "Out of stock"}
              </span>
            </div>

            <p className="description">{product.description}</p>

            {product.countInStock > 0 && (
              <div className="add-to-cart-section">
                <div className="quantity-selector">
                  <label htmlFor="quantity">Quantity:</label>
                  <input
                    id="quantity"
                    type="number"
                    min="1"
                    max={product.countInStock}
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                    className="quantity-input"
                  />
                </div>

                <Button
                  onClick={handleAddToCart}
                  className={addedToCart ? "success" : ""}
                >
                  {addedToCart ? "✓ Added to Cart" : "Add to Cart"}
                </Button>
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}
