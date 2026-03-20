import express from "express";
import {
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";
import { verifyToken, verifyAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// All admin routes require authentication and admin role
router.post("/products", verifyToken, verifyAdmin, createProduct);
router.put("/products/:id", verifyToken, verifyAdmin, updateProduct);
router.delete("/products/:id", verifyToken, verifyAdmin, deleteProduct);

export default router;
