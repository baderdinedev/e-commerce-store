import Coupon from "../models/coupon.model.js";
import Product from "../models/product.model.js";
 
export const createCoupon = async (req, res) => {
    try {
        const {
            code,
            discountType,
            discountValue,
            expiryDate,
            minPurchaseAmount,
            maxDiscountAmount,
            usageLimit,
            applicableProducts,
            applicableCategories,
        } = req.body;

        // Check if the coupon code already exists
        const existingCoupon = await Coupon.findOne({ code });
        if (existingCoupon) {
            return res.status(400).json({ message: "Coupon code already exists" });
        }

        // Create new coupon
        const newCoupon = new Coupon({
            code,
            discountType,
            discountValue,
            expiryDate,
            minPurchaseAmount,
            maxDiscountAmount,
            usageLimit,
            applicableProducts,
            applicableCategories,
        });

        await newCoupon.save();

        res.status(201).json({
            success: true,
            message: "Coupon created successfully",
            data: newCoupon,
        });
    } catch (error) {
        console.error("Error creating coupon:", error);
        res.status(500).json({ message: "Server error, please try again later" });
    }
};

 
export const getCoupons = async (req, res) => {
    try {
        const coupons = await Coupon.find();
        res.status(200).json({
            success: true,
            data: coupons,
        });
    } catch (error) {
        console.error("Error fetching coupons:", error);
        res.status(500).json({ message: "Server error, please try again later" });
    }
};

// Get a specific coupon by code
export const getCouponByCode = async (req, res) => {
    try {
        const { code } = req.params;

        // Find the coupon by code
        const coupon = await Coupon.findOne({ code });
        if (!coupon) {
            return res.status(404).json({ message: "Coupon not found" });
        }

        res.status(200).json({
            success: true,
            data: coupon,
        });
    } catch (error) {
        console.error("Error fetching coupon:", error);
        res.status(500).json({ message: "Server error, please try again later" });
    }
};

// Update an existing coupon
export const updateCoupon = async (req, res) => {
    try {
        const { code } = req.params;

        // Find the coupon to update
        const coupon = await Coupon.findOne({ code });
        if (!coupon) {
            return res.status(404).json({ message: "Coupon not found" });
        }

        const {
            discountType,
            discountValue,
            expiryDate,
            minPurchaseAmount,
            maxDiscountAmount,
            isActive,
            usageLimit,
            applicableProducts,
            applicableCategories,
        } = req.body;

        // Update coupon fields
        coupon.discountType = discountType || coupon.discountType;
        coupon.discountValue = discountValue || coupon.discountValue;
        coupon.expiryDate = expiryDate || coupon.expiryDate;
        coupon.minPurchaseAmount = minPurchaseAmount || coupon.minPurchaseAmount;
        coupon.maxDiscountAmount = maxDiscountAmount || coupon.maxDiscountAmount;
        coupon.isActive = isActive !== undefined ? isActive : coupon.isActive;
        coupon.usageLimit = usageLimit || coupon.usageLimit;
        coupon.applicableProducts = applicableProducts || coupon.applicableProducts;
        coupon.applicableCategories = applicableCategories || coupon.applicableCategories;

        await coupon.save();

        res.status(200).json({
            success: true,
            message: "Coupon updated successfully",
            data: coupon,
        });
    } catch (error) {
        console.error("Error updating coupon:", error);
        res.status(500).json({ message: "Server error, please try again later" });
    }
};

// Delete a coupon
export const deleteCoupon = async (req, res) => {
    try {
        const { code } = req.params;

        // Find and delete the coupon
        const coupon = await Coupon.findOneAndDelete({ code });
        if (!coupon) {
            return res.status(404).json({ message: "Coupon not found" });
        }

        res.status(200).json({
            success: true,
            message: "Coupon deleted successfully",
        });
    } catch (error) {
        console.error("Error deleting coupon:", error);
        res.status(500).json({ message: "Server error, please try again later" });
    }
};

// Validate if a coupon is applicable to a product or order
export const validateCoupon = async (req, res) => {
    try {
        const { code, productId, totalAmount } = req.body;

        // Find the coupon by code
        const coupon = await Coupon.findOne({ code });
        if (!coupon) {
            return res.status(404).json({ message: "Coupon not found" });
        }

        // Check if the coupon is active
        if (!coupon.isActive) {
            return res.status(400).json({ message: "Coupon is inactive" });
        }

        // Check if the coupon is expired
        const currentDate = new Date();
        if (coupon.expiryDate < currentDate) {
            return res.status(400).json({ message: "Coupon has expired" });
        }

        // Check if the product is applicable for the coupon
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        const isProductApplicable = coupon.applicableProducts.includes(productId);
        if (coupon.applicableProducts.length > 0 && !isProductApplicable) {
            return res.status(400).json({ message: "Coupon is not applicable to this product" });
        }

        // Check if the minimum purchase amount is met
        if (totalAmount < coupon.minPurchaseAmount) {
            return res.status(400).json({ message: "Minimum purchase amount not met" });
        }

        // Check if the maximum discount amount is exceeded
        if (coupon.maxDiscountAmount && totalAmount > coupon.maxDiscountAmount) {
            return res.status(400).json({ message: "Total amount exceeds maximum discount amount" });
        }

        // Check if usage limit is exceeded
        if (coupon.usageLimit && coupon.usedCount >= coupon.usageLimit) {
            return res.status(400).json({ message: "Usage limit reached" });
        }

        res.status(200).json({
            success: true,
            message: "Coupon is valid",
            data: coupon,
        });
    } catch (error) {
        console.error("Error validating coupon:", error);
        res.status(500).json({ message: "Server error, please try again later" });
    }
};
