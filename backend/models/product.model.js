import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
    {
        rating: {
            type: Number,
            required: true,
            min: 1,
            max: 5, 
        },
        comment: {
            type: String,
            required: true,
            trim: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",  
            required: true,
        },
    },
    { timestamps: true }
);

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Product name is required"],
            trim: true,
        },
        description: {
            type: String,
            required: [true, "Product description is required"],
        },
        image: {
            type: String,
            required: [true, "Product Image is required"],
        },
        price: {
            type: Number,
            required: [true, "Product price is required"],
            min: [0, "Price cannot be negative"],
        },
        isFeatured: {
            type: Boolean,
            default: false,
        },
        category: {
            type: String,
            required: [true, "Product category is required"],
            trim: true,
        },
        reviews: [reviewSchema],  
        averageRating: {
            type: Number,
            default: 0,
        }, 
    },
    { timestamps: true }
);

 
productSchema.methods.updateAverageRating = function () {
    if (this.reviews.length === 0) {
        this.averageRating = 0;
    } else {
        const totalRating = this.reviews.reduce((acc, review) => acc + review.rating, 0);
        this.averageRating = totalRating / this.reviews.length;
    }
};

 
productSchema.pre('save', function (next) {
    this.updateAverageRating();
    next();
});

const Product = mongoose.model("Product", productSchema);

export default Product;
