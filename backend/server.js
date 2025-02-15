import express from "express"
import dotenv from "dotenv"
import authRoutes from "./routes/auth.route.js"
import productRoutes from "./routes/product.route.js"
import cartRoutes from "./routes/cart.route.js"
import couponRoutes from "./routes/coupon.route.js"
import AnyalyticsRoutes from "./routes/analytics.route.js"
import  connectDb from "./lib/db.js"
import cookieParser from "cookie-parser";

// import swaggerDocs from "./swagger.js"; 

dotenv.config()

const app = express()
app.use(express.json());
app.use(cookieParser()); 

// swaggerDocs(app);

const PORT = process.env.PORT || 5000

app.use('/api/auth', authRoutes)
app.use('/api/product', productRoutes)
app.use('api/cart', cartRoutes)
app.use('api/coupon', couponRoutes)
app.use('api/analytics', AnyalyticsRoutes)

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
    connectDb()
});

