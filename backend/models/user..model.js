import mongoose from "mongoose";
import bcrypt from "bcryptjs";


const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],  
        },
        email: {
            type: String,
            required: [true, "Email is required"],  
            unique: true,
        },
        password: {
            type: String,
            required: [true, "Password is required"],  
        },
        cartItems: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Product",
                    required: true,
                },
                quantity: {
                    type: Number,
                    required: true,
                    default: 1,
                },
            },
        ],
        role: {
            type: String,
            enum: ["customer", "admin"],
            default: "customer",
        },
    },
    {
        timestamps: true,
    }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.addToCart = function (productId, quantity = 1) {
    const cartItem = this.cartItems.find((item) => item.product.equals(productId));

    if (cartItem) {
        cartItem.quantity += quantity;
    } else {
        this.cartItems.push({ product: productId, quantity });
    }

    return this.save();
};

userSchema.methods.removeFromCart = function (productId) {
    this.cartItems = this.cartItems.filter((item) => !item.product.equals(productId));
    return this.save();
};

userSchema.statics.findByEmail = function (email) {
    return this.findOne({ email });
};

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

const User = mongoose.model("User", userSchema);

export default User;