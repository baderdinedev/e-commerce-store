import express from "express";
import {
  getAllAnalytics,
  getProductAnalytics,
  addProductView,
  getAnalyticsByDateRange,
} from "../controllers/analytics.controller.js";
import { protect } from "../middleware/authMiddleware.js";
import isAdmin from "../middleware/isAdminAuth.js";

const router = express.Router();

// Get all analytics data (Protected and Admin only route)
router.get("/", protect, isAdmin, getAllAnalytics);

// Get analytics data by product ID (Protected and Admin only route)
router.get("/:productId", protect, isAdmin, getProductAnalytics);

// Add a product view (Could be public or authenticated)
router.post("/view", protect, addProductView);

// Get analytics within a specific date range (Protected and Admin only route)
router.get("/date-range", protect, isAdmin, getAnalyticsByDateRange);

export default router;
