import express from "express";
import { getAllProducts, addNewProduct, editProduct, deleteProduct } from "../controllers/product.controller.js";
import isAdmin from "../middleware/isAdminAuth.js"
import { protect } from "../middleware/authMiddleware.js"


const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: API endpoints for managing products
 */

/**
 * @swagger
 * /api/product:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     description: Retrieve a list of all products.
 *     responses:
 *       200:
 *         description: Successfully fetched products.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: "60c72b2f9b1e8a001c8e4d73"
 *                   name:
 *                     type: string
 *                     example: "Iphone 16"
 *                   description:
 *                     type: string
 *                     example: "Iphone 16 latest model"
 *                   image:
 *                     type: string
 *                     example: "iphone16.jpg"
 *                   price:
 *                     type: number
 *                     example: 1600
 *                   isFeatured:
 *                     type: boolean
 *                     example: true
 *                   category:
 *                     type: string
 *                     example: "Apple Mobile"
 */

/**
 * @swagger
 * /api/product:
 *   post:
 *     summary: Add a new product
 *     tags: [Products]
 *     description: Create a new product and store it in the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *               - image
 *               - price
 *               - category
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Iphone 16"
 *               description:
 *                 type: string
 *                 example: "Iphone 16 latest model"
 *               image:
 *                 type: string
 *                 example: "iphone16.jpg"
 *               price:
 *                 type: number
 *                 example: 1600
 *               isFeatured:
 *                 type: boolean
 *                 example: true
 *               category:
 *                 type: string
 *                 example: "Apple Mobile"
 *     responses:
 *       201:
 *         description: Product created successfully.
 *       400:
 *         description: Bad request. Missing required fields.
 *       500:
 *         description: Server error.
 */

router.get("/", getAllProducts);
router.post("/", protect, isAdmin, addNewProduct);
router.put("/:id", protect, isAdmin, editProduct);
router.delete("/:id", protect, isAdmin, deleteProduct);

export default router;
