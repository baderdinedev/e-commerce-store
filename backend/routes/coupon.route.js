import express from "express";
import {
  createCoupon,
  getCoupons,
  getCouponByCode,
  updateCoupon,
  deleteCoupon,
  validateCoupon,
} from "../controllers/coupon.controller.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Create a new coupon (Protected route)
router.post("/", protect, createCoupon);

// Get all coupons (Public route)
router.get("/", getCoupons);

// Get a specific coupon by code (Public route)
router.get("/:code", getCouponByCode);

// Update a coupon (Protected route)
router.put("/:code", protect, updateCoupon);

// Delete a coupon (Protected route)
router.delete("/:code", protect, deleteCoupon);

// Validate a coupon (Public route)
router.post("/validate", validateCoupon);

export default router;
