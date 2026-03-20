import { Link } from "react-router-dom";
import "./Landing.css";

export default function Landing() {
  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to E-Shop</h1>
          <p>Discover premium products at great prices</p>
          <div className="hero-buttons">
            <Link to="/products" className="btn btn-primary">
              Shop Now
            </Link>
            <Link to="/signup" className="btn btn-secondary">
              Create Account
            </Link>
          </div>
        </div>
        <div className="hero-image">
          <div className="hero-placeholder">🛍️</div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <h2>Why Choose Us?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">✨</div>
            <h3>Quality Products</h3>
            <p>Curated selection of premium items</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🚚</div>
            <h3>Fast Shipping</h3>
            <p>Quick and reliable delivery</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💎</div>
            <h3>Best Prices</h3>
            <p>Competitive pricing on all items</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔒</div>
            <h3>Secure Payment</h3>
            <p>Safe and encrypted transactions</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <h2>Ready to Shop?</h2>
        <p>Browse our collection and find exactly what you're looking for</p>
        <Link to="/products" className="btn btn-large">
          Start Shopping
        </Link>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2026 E-Shop. All rights reserved.</p>
      </footer>
    </div>
  );
}
