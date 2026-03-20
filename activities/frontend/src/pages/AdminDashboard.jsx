import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import Card from "../components/Card";
import AdminProductForm from "./AdminProductForm";
import "./AdminDashboard.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export default function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

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

  const handleDeleteProduct = async (productId) => {
    if (!confirm("Are you sure you want to delete this product?")) {
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/api/products/${productId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete product");
      }

      setProducts(products.filter((p) => p._id !== productId));
      alert("Product deleted successfully!");
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  const handleProductSaved = () => {
    fetchProducts();
    setShowForm(false);
    setEditingProduct(null);
  };

  if (loading) {
    return (
      <div className="admin-container">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>Admin Dashboard</h1>
        <Button
          onClick={() => {
            setEditingProduct(null);
            setShowForm(true);
          }}
        >
          + Add New Product
        </Button>
      </div>

      {showForm && (
        <Card className="form-card">
          <AdminProductForm
            product={editingProduct}
            onSaved={handleProductSaved}
            onCancel={() => {
              setShowForm(false);
              setEditingProduct(null);
            }}
          />
        </Card>
      )}

      {error && <p className="error">{error}</p>}

      <Card className="products-table-card">
        <table className="products-table">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product.name}</td>
                <td>${product.price.toFixed(2)}</td>
                <td>{product.countInStock}</td>
                <td>{product.category}</td>
                <td>
                  <button
                    className="edit-button"
                    onClick={() => {
                      setEditingProduct(product);
                      setShowForm(true);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="delete-button"
                    onClick={() => handleDeleteProduct(product._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      <div className="admin-footer">
        <Link to="/">
          <Button className="back-button">Back to Store</Button>
        </Link>
      </div>
    </div>
  );
}
