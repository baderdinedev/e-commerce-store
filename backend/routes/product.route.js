import express from "express";
import { 
    getAllProducts,
    addNewProduct,
    editProduct,
    deleteProduct,
    getFeaturedProducts,
    getRecommendedProducts,
    addReview, getReviews
} from "../controllers/product.controller.js";

import isAdmin from "../middleware/isAdminAuth.js"
import { protect } from "../middleware/authMiddleware.js"


const router = express.Router();

router.get("/", getAllProducts);
router.post("/", protect, isAdmin, addNewProduct);
router.put("/:id", protect, isAdmin, editProduct);
router.delete("/:id", protect, isAdmin, deleteProduct);

router.get("/featured", getFeaturedProducts);  
router.get("/recommended", getRecommendedProducts);   

// Review
router.post('/product/:productId/review', protect, addReview);
router.get('/product/:productId/reviews', getReviews);

export default router;
