import Product from "../models/product.model.js"

export const getAllProducts = async (req, res) => {
    try {
        const { search, minPrice, maxPrice, category, isFeatured, sortBy, sortOrder } = req.query;
        const query = {};

        if (search) {
            query.name = { $regex: search, $options: 'i' };  
        }

        if (minPrice || maxPrice) {
            query.price = {};
            if (minPrice) query.price.$gte = minPrice;
            if (maxPrice) query.price.$lte = maxPrice;
        }

        if (category) {
            query.category = { $regex: category, $options: 'i' };  
        }

        if (isFeatured !== undefined) {
            query.isFeatured = isFeatured === 'true'; 
        }

        // Sort functionality
        const sort = {};
        if (sortBy && sortOrder) {
            sort[sortBy] = sortOrder === 'asc' ? 1 : -1;  
        }


        const products = await Product.find(query).sort(sort);

        if (!products.length) {
            return res.status(404).json({
                message: "No products found matching your criteria"
            });
        }

        res.status(200).json({
            success: true,
            count: products.length,
            data: products,
        });

    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ message: "Server error, please try again later" });
    }
};


export const addNewProduct = async (req, res) => {
    try {
        const { name, description, image , price, isFeatured, category } = req.body;

        if (!name || !description ||  !image ||   !price || !category) {
            return res.status(400).json({ message: "All fields are required except isFeatured" });
        }

        // Create a new product instance
        const newProduct = new Product({
            name,
            description,
            image,
            price,
            isFeatured: isFeatured || false,  
            category
        });

        // Save the product to the database
        const savedProduct = await newProduct.save();

        // Return success response
        res.status(201).json({
            success: true,
            message: "Product created successfully",
            data: savedProduct,
        });

    } catch (error) {
        // Handle server errors
        console.error("Error creating product:", error);
        res.status(500).json({ message: "Server error, please try again later" });
    }
};

export const editProduct = async (req, res) => {
    try {
        const { id } = req.params; 
        const { name, description, image, price, isFeatured, category } = req.body;


        const existingProduct = await Product.findById(id);
        if (!existingProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        if (name) existingProduct.name = name;
        if (description) existingProduct.description = description;
        if (image) existingProduct.image = image;
        if (price) existingProduct.price = price;
        if (isFeatured !== undefined) existingProduct.isFeatured = isFeatured;
        if (category) existingProduct.category = category;

      
        const updatedProduct = await existingProduct.save();

     
        res.status(200).json({
            success: true,
            message: "Product updated successfully",
            data: updatedProduct,
        });

    } catch (error) {
        // Handle server errors
        console.error("Error updating product:", error);
        res.status(500).json({ message: "Server error, please try again later" });
    }
};


export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;  

        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        await Product.findByIdAndDelete(id);

        res.status(200).json({ success: true, message: "Product deleted successfully" });

    } catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

export const getFeaturedProducts = async (req, res) => {
    try {
        const featuredProducts = await Product.find({ isFeatured: true });

        if (!featuredProducts.length) {
            return res.status(404).json({ message: "No featured products found" });
        }

        res.status(200).json({
            success: true,
            count: featuredProducts.length,
            data: featuredProducts,
        });
    } catch (error) {
        console.error("Error fetching featured products:", error);
        res.status(500).json({ message: "Server error, please try again later" });
    }
};


export const getRecommendedProducts = async (req, res) => {
    try {
        const recommendedProducts = await Product.find({ isFeatured: false });

        if (!recommendedProducts.length) {
            return res.status(404).json({ message: "No recommended products found" });
        }

        res.status(200).json({
            success: true,
            count: recommendedProducts.length,
            data: recommendedProducts,
        });
    } catch (error) {
        console.error("Error fetching recommended products:", error);
        res.status(500).json({ message: "Server error, please try again later" });
    }
};


// Review : 

export const addReview = async (req, res) => {
    try {
        const { productId } = req.params;  
        const { rating, comment } = req.body;  

        const userId = req.user._id;  
 
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        const newReview = {
            rating,
            comment,
            user: userId,
        };
 
        product.reviews.push(newReview);
 
        await product.save();

        res.status(201).json({
            success: true,
            message: "Review added successfully",
            data: product,
        });

    } catch (error) {
        console.error("Error adding review:", error);
        res.status(500).json({ message: "Server error, please try again later" });
    }
};


export const getReviews = async (req, res) => {
    try {
        const { productId } = req.params;


        const product = await Product.findById(productId).populate("reviews.user", "name email");

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({
            success: true,
            data: product.reviews,
        });

    } catch (error) {
        console.error("Error fetching reviews:", error);
        res.status(500).json({ message: "Server error, please try again later" });
    }
};
