import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "../models/Product.js";
import connectDB from "../config/db.js";

dotenv.config();

const sampleProducts = [
  {
    name: "Wireless Headphones",
    price: 79.99,
    description: "High-quality wireless headphones with noise cancellation",
    image: "https://via.placeholder.com/300x200?text=Wireless+Headphones",
    countInStock: 50,
    category: "Electronics",
  },
  {
    name: "USB-C Cable",
    price: 12.99,
    description: "Durable USB-C charging cable, 2 meters long",
    image: "https://via.placeholder.com/300x200?text=USB-C+Cable",
    countInStock: 150,
    category: "Accessories",
  },
  {
    name: "Smartphone Stand",
    price: 15.99,
    description: "Adjustable phone stand for desk, works with all phones",
    image: "https://via.placeholder.com/300x200?text=Phone+Stand",
    countInStock: 80,
    category: "Accessories",
  },
  {
    name: "Mechanical Keyboard",
    price: 129.99,
    description: "RGB mechanical keyboard with customizable switches",
    image: "https://via.placeholder.com/300x200?text=Mechanical+Keyboard",
    countInStock: 30,
    category: "Electronics",
  },
  {
    name: "Wireless Mouse",
    price: 34.99,
    description: "Ergonomic wireless mouse with USB receiver",
    image: "https://via.placeholder.com/300x200?text=Wireless+Mouse",
    countInStock: 60,
    category: "Electronics",
  },
  {
    name: "Monitor Light Bar",
    price: 89.99,
    description: "Smart light bar that mounts above your monitor",
    image: "https://via.placeholder.com/300x200?text=Light+Bar",
    countInStock: 25,
    category: "Accessories",
  },
  {
    name: "Laptop Stand",
    price: 44.99,
    description: "Aluminum laptop stand for better ergonomics",
    image: "https://via.placeholder.com/300x200?text=Laptop+Stand",
    countInStock: 45,
    category: "Accessories",
  },
  {
    name: "External SSD 1TB",
    price: 129.99,
    description: "Fast external SSD with 1TB storage capacity",
    image: "https://via.placeholder.com/300x200?text=External+SSD",
    countInStock: 35,
    category: "Storage",
  },
  {
    name: "USB Hub 7-Port",
    price: 24.99,
    description: "Expandable USB hub with 7 ports and fast charging",
    image: "https://via.placeholder.com/300x200?text=USB+Hub",
    countInStock: 70,
    category: "Accessories",
  },
  {
    name: "Webcam 4K",
    price: 99.99,
    description: "Crystal clear 4K webcam with auto-focus",
    image: "https://via.placeholder.com/300x200?text=4K+Webcam",
    countInStock: 40,
    category: "Electronics",
  },
];

const seedDatabase = async () => {
  try {
    console.log("Connecting to database...");
    await connectDB();

    console.log("Clearing existing products...");
    await Product.deleteMany({});

    console.log("Seeding products...");
    const createdProducts = await Product.insertMany(sampleProducts);
    console.log(`${createdProducts.length} products seeded successfully!`);

    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedDatabase();
