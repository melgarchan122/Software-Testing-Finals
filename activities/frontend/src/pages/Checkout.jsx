import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Card from "../components/Card";
import { useCart } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthContext";
import "./Checkout.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export default function Checkout() {
  const navigate = useNavigate();
  const { cart, getTotalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handlePlaceOrder = async () => {
    if (cart.length === 0) {
      setError("Your cart is empty");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/api/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          items: cart.map((item) => ({
            productId: item.productId,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
          })),
          totalPrice: getTotalPrice(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to place order");
      }

      // Clear cart and redirect to success page
      clearCart();
      alert("Order placed successfully!");
      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="checkout-container">
        <Card>
          <div className="empty-cart">
            <h2>Your cart is empty</h2>
            <p>Add items to your cart before checking out</p>
            <Button onClick={() => navigate("/")}>Continue Shopping</Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      <h1>Checkout</h1>

      <div className="checkout-content">
        <Card className="checkout-info-card">
          <h2>Shipping Information</h2>
          <div className="info-section">
            <p>
              <strong>User:</strong> {user?.username || user?.email}
            </p>
            <p>
              <strong>Email:</strong> {user?.email}
            </p>
          </div>
        </Card>

        <Card className="order-summary-card">
          <h2>Order Summary</h2>
          <div className="order-items">
            {cart.map((item) => (
              <div key={item.productId} className="order-item">
                <img src={item.image} alt={item.name} className="item-image" />
                <div className="item-details">
                  <h4>{item.name}</h4>
                  <p>Quantity: {item.quantity}</p>
                  <p>${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="order-total">
            <h3>Total: ${getTotalPrice().toFixed(2)}</h3>
          </div>

          {error && <p className="error">{error}</p>}

          <Button
            onClick={handlePlaceOrder}
            loading={loading}
            className="place-order-button"
          >
            {loading ? "Processing..." : "Place Order"}
          </Button>

          <Button onClick={() => navigate("/cart")} className="back-button">
            Back to Cart
          </Button>
        </Card>
      </div>
    </div>
  );
}
