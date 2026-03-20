import { useState, useEffect } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import "./AdminDashboard.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export default function AdminProductForm({ product, onSaved, onCancel }) {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
    countInStock: "",
    category: "General",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        price: product.price,
        description: product.description,
        image: product.image,
        countInStock: product.countInStock,
        category: product.category,
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name) newErrors.name = "Product name is required";
    if (!formData.price || formData.price <= 0)
      newErrors.price = "Valid price is required";
    if (!formData.description)
      newErrors.description = "Description is required";
    if (!formData.image) newErrors.image = "Image URL is required";
    if (formData.countInStock < 0)
      newErrors.countInStock = "Stock count cannot be negative";

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      const method = product ? "PUT" : "POST";
      const url = product
        ? `${API_URL}/api/products/${product._id}`
        : `${API_URL}/api/products`;

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to save product");
      }

      alert(
        product
          ? "Product updated successfully!"
          : "Product created successfully!",
      );
      onSaved();
    } catch (err) {
      setErrors({ form: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="product-form">
      <h2>{product ? "Edit Product" : "Add New Product"}</h2>

      {errors.form && <p className="error">{errors.form}</p>}

      <Input
        label="Product Name"
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        error={errors.name}
        placeholder="Enter product name"
        required
      />

      <Input
        label="Price"
        type="number"
        name="price"
        value={formData.price}
        onChange={handleChange}
        error={errors.price}
        placeholder="Enter price"
        step="0.01"
        required
      />

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter product description"
          rows="4"
          required
        />
        {errors.description && <p className="error">{errors.description}</p>}
      </div>

      <Input
        label="Image URL"
        type="url"
        name="image"
        value={formData.image}
        onChange={handleChange}
        error={errors.image}
        placeholder="Enter image URL"
        required
      />

      <Input
        label="Stock Count"
        type="number"
        name="countInStock"
        value={formData.countInStock}
        onChange={handleChange}
        error={errors.countInStock}
        placeholder="Enter stock count"
        required
      />

      <Input
        label="Category"
        type="text"
        name="category"
        value={formData.category}
        onChange={handleChange}
        placeholder="Enter category"
      />

      <div className="form-buttons">
        <Button type="submit" loading={loading}>
          {loading
            ? "Saving..."
            : product
              ? "Update Product"
              : "Create Product"}
        </Button>
        <Button type="button" onClick={onCancel} className="cancel-button">
          Cancel
        </Button>
      </div>
    </form>
  );
}
