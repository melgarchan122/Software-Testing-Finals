import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // PALITAN: from Link to useNavigate
import Card from "../components/Card";
import "./Home.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const CATEGORIES = [
  {
    id: "audio",
    name: "Audio",
    icon: "🎧",
    description: "Headphones & Speakers",
  },
  {
    id: "cables",
    name: "Cables",
    icon: "🔌",
    description: "Connectors & Adapters",
  },
  {
    id: "accessories",
    name: "Accessories",
    icon: "🖥️",
    description: "Stands & Mounts",
  },
  {
    id: "peripherals",
    name: "Peripherals",
    icon: "⌨️",
    description: "Keyboards & Input Devices",
  },
];

export default function Home() {
  const navigate = useNavigate(); // ADD THIS for navigation
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/api/products`);
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = await response.json();
      setProducts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      !selectedCategory ||
      product.category?.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  const handleAddToCart = (e, product) => {
    e.stopPropagation(); // Para hindi mag-navigate sa product page
    // Add your add to cart logic here
    console.log("Add to cart:", product);
  };

  if (loading) {
    return (
      <div className="home-container">
        <p>Loading products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="home-container">
        <p className="error">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="home-container">
      <div className="home-header">
        <h1>Shop Our Products</h1>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      <div className="home-layout">
        {/* Sidebar - Categories */}
        <aside className="sidebar-categories">
          <h2>Categories</h2>
          <button
            className={`category-btn ${!selectedCategory ? "active" : ""}`}
            onClick={() => setSelectedCategory(null)}
          >
            <span className="category-btn-icon">🏠</span>
            <span className="category-btn-name">All Products</span>
          </button>
          {CATEGORIES.map((category) => (
            <button
              key={category.id}
              className={`category-btn ${selectedCategory === category.name ? "active" : ""}`}
              onClick={() => setSelectedCategory(category.name)}
            >
              <span className="category-btn-icon">{category.icon}</span>
              <span className="category-btn-name">{category.name}</span>
            </button>
          ))}
        </aside>

        {/* Main Content - Products Grid */}
        <main className="products-section">
          {/* Results Info */}
          <div className="results-info">
            <div>
              <span className="results-count">
                Products ({filteredProducts.length})
              </span>
              <p className="results-text">
                Showing {filteredProducts.length} results
                {searchTerm ? ` for "${searchTerm}"` : ""}
                {selectedCategory ? ` in ${selectedCategory}` : ""}
              </p>
            </div>
          </div>

          {filteredProducts.length === 0 ? (
            <p className="no-products">
              {searchTerm || selectedCategory
                ? "No products match your search or category."
                : "No products available."}
            </p>
          ) : (
            <div className="products-grid">
              {filteredProducts.map((product) => (
                <div
                  key={product._id}
                  className="product-card"
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
                    <div className="product-price">
                      ${product.price.toFixed(2)}
                    </div>
                  </div>
                  <button
                    className="btn-buy-now"
                    onClick={(e) => handleAddToCart(e, product)}
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
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
