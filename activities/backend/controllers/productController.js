import Product from "../models/Product.js";
import Order from "../models/Order.js";

// Product Controllers
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { name, price, description, image, countInStock, category } =
      req.body;

    if (!name || !price || !description || !image) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const product = new Product({
      name,
      price,
      description,
      image,
      countInStock,
      category,
    });

    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { name, price, description, image, countInStock, category } =
      req.body;

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      {
        name,
        price,
        description,
        image,
        countInStock,
        category,
      },
      { new: true },
    );

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Order Controllers
export const createOrder = async (req, res) => {
  try {
    const { items, totalPrice } = req.body;
    const userId = req.user.id;

    if (!items || !totalPrice) {
      return res
        .status(400)
        .json({ message: "Items and totalPrice are required" });
    }

    const order = new Order({
      userId,
      items,
      totalPrice,
      status: "Pending",
    });

    const savedOrder = await order.save();
    res.status(201).json({
      message: "Order created successfully",
      order: savedOrder,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
