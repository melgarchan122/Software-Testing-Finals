import express from "express";
import { createOrder, getOrders } from "../controllers/productController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// Protected routes
router.post("/", verifyToken, createOrder);
router.get("/", verifyToken, getOrders);

export default router;
