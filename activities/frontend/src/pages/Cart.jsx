import { Link } from "react-router-dom";
import Button from "../components/Button";
import Card from "../components/Card";
import { useCart } from "../contexts/CartContext";
import "./Cart.css";

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, getTotalPrice } = useCart();

  if (cart.length === 0) {
    return (
      <div className="cart-container">
        <div className="empty-cart">
          <h2>Your cart is empty</h2>
          <p>Start shopping to add items to your cart</p>
          <Link to="/">
            <Button className="continue-btn">Continue Shopping</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h1>Shopping Cart</h1>

      <div className="cart-layout">
        {/* Cart Items */}
        <div className="cart-items">
          {cart.map((item) => (
            <div key={item.productId} className="cart-item">
              <img
                src={item.image}
                alt={item.name}
                className="cart-item-image"
              />
              <div className="cart-item-details">
                <h3 className="cart-item-name">{item.name}</h3>
                {item.category && (
                  <span className="cart-item-category">{item.category}</span>
                )}
                <div className="cart-item-price">${item.price.toFixed(2)}</div>
              </div>
              <div className="cart-item-quantity">
                <label>Qty</label>
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) =>
                    updateQuantity(
                      item.productId,
                      parseInt(e.target.value) || 1,
                    )
                  }
                  className="quantity-input"
                />
              </div>
              <div className="cart-item-total">
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
              <button
                className="remove-btn"
                onClick={() => removeFromCart(item.productId)}
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="order-summary">
          <h2>Order Summary</h2>

          <div className="summary-details">
            <div className="summary-row">
              <span>Subtotal</span>
              <span>${getTotalPrice().toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span>$0.00</span>
            </div>
            <div className="summary-row">
              <span>Tax</span>
              <span>$0.00</span>
            </div>
            <div className="summary-row total">
              <span>Total</span>
              <span>${getTotalPrice().toFixed(2)}</span>
            </div>
          </div>

          <Link to="/checkout">
            <button className="checkout-btn">Proceed to Checkout</button>
          </Link>

          <Link to="/">
            <button className="continue-shopping-btn">Continue Shopping</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
