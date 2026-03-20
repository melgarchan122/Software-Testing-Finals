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
        <Card>
          <div className="empty-cart">
            <h2>Your cart is empty</h2>
            <p>Start shopping to add items to your cart</p>
            <Link to="/">
              <Button>Continue Shopping</Button>
            </Link>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h1>Shopping Cart</h1>

      <div className="cart-content">
        <Card className="cart-items-card">
          <table className="cart-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item.productId}>
                  <td className="product-cell">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="item-image"
                    />
                    <span>{item.name}</span>
                  </td>
                  <td>${item.price.toFixed(2)}</td>
                  <td>
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
                  </td>
                  <td>${(item.price * item.quantity).toFixed(2)}</td>
                  <td>
                    <button
                      className="remove-button"
                      onClick={() => removeFromCart(item.productId)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>

        <Card className="cart-summary-card">
          <h2>Order Summary</h2>
          <div className="summary-row">
            <span>Subtotal:</span>
            <span>${getTotalPrice().toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Shipping:</span>
            <span>$0.00</span>
          </div>
          <div className="summary-row">
            <span>Tax:</span>
            <span>$0.00</span>
          </div>
          <div className="summary-row total">
            <span>Total:</span>
            <span>${getTotalPrice().toFixed(2)}</span>
          </div>

          <Link to="/checkout">
            <Button className="checkout-button">Proceed to Checkout</Button>
          </Link>

          <Link to="/">
            <Button className="continue-button">Continue Shopping</Button>
          </Link>
        </Card>
      </div>
    </div>
  );
}
