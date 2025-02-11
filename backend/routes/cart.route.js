import express from "express";
import {
  addToCart,
  getCart,
  updateCartItem,
  removeFromCart,
  clearCart,
} from "../controllers/cart.controller.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();
 
router.post("/add", protect, addToCart);
 
router.get("/:userId", protect, getCart);

 
router.put("/update", protect, updateCartItem);

 
router.delete("/remove", protect, removeFromCart);
 
router.delete("/clear/:userId", protect, clearCart);

export default router;