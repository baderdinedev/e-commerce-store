import User from "../models/user..model.js";
import jwt from "jsonwebtoken";
import { redis } from "../lib/redis.js";

// Generate access and refresh tokens
const generateTokens = (userId) => {
    const accessToken = jwt.sign(
        { userId },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN }
    );

    const refreshToken = jwt.sign(
        { userId },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN }
    );

    return { accessToken, refreshToken };
};

// Store refresh token in Redis
const storeRefreshToken = async (userId, refreshToken) => {
    // Convert expiration time to seconds
    const expiresInSeconds = Math.floor(
        (new Date().getTime() + parseInt(process.env.REFRESH_TOKEN_EXPIRES_IN)) / 1000
    );

    // Store the refresh token in Redis with an expiration time
    await redis.set(userId.toString(), refreshToken, "EX", expiresInSeconds);
};

// Set cookies for tokens
const setCookies = (res, accessToken, refreshToken) => {
    // Set access token cookie
    res.cookie("accessToken", accessToken, {
        httpOnly: true, // Prevent client-side access
        secure: process.env.NODE_ENV === "production", // Only send over HTTPS in production
        sameSite: "strict", // Prevent CSRF attacks
        maxAge: 15 * 60 * 1000, // 15 minutes (matches access token expiration)
    });

    // Set refresh token cookie
    res.cookie("refreshToken", refreshToken, {
        httpOnly: true, // Prevent client-side access
        secure: process.env.NODE_ENV === "production", // Only send over HTTPS in production
        sameSite: "strict", // Prevent CSRF attacks
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days (matches refresh token expiration)
    });
};

// Signup
export const signup = async (req, res, next) => {
    const { name, email, password } = req.body;

    try {
        // Check if the user already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Create a new user
        const newUser = new User({
            name,
            email,
            password,
        });

        // Save the user to the database
        await newUser.save();

        // Generate tokens
        const { accessToken, refreshToken } = generateTokens(newUser._id);

        // Store the refresh token in Redis
        await storeRefreshToken(newUser._id, refreshToken);

        // Set cookies for tokens
        setCookies(res, accessToken, refreshToken);

        // Send the response
        res.status(201).json({
            message: "User created successfully",
            user: {
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                role: newUser.role,
            },
        });
    } catch (error) {
        next(error);
    }
};

// Login
export const login = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        // Compare passwords
        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        // Generate tokens
        const { accessToken, refreshToken } = generateTokens(user._id);

        // Store the refresh token in Redis
        await storeRefreshToken(user._id, refreshToken);

        // Set cookies for tokens
        setCookies(res, accessToken, refreshToken);

        // Send the response
        res.status(200).json({
            message: "Login successful",
            tokens: { accessToken, refreshToken },
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });
    } catch (error) {
        next(error);
    }
};


export const logout = async (req, res, next) => {
    try {
        if (!req.cookies) {
            return res.status(400).json({ message: "Cookies are not available" });
        }

        const refreshToken = req.cookies.refreshToken;

        if (!refreshToken) {
            return res.status(400).json({ message: "No refresh token provided" });
        }

        // Verify the token and get the user ID
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        const userId = decoded.userId; // ✅ Ensure this matches the payload in `generateTokens`

        // Delete the refresh token from Redis
        await redis.del(userId.toString());

        // Clear cookies
        res.clearCookie("accessToken", { httpOnly: true, secure: process.env.NODE_ENV === "production" });
        res.clearCookie("refreshToken", { httpOnly: true, secure: process.env.NODE_ENV === "production" });

        res.status(200).json({ message: "Logout successful" });
    } catch (error) {
        next(error);
    }
};


export const refreshTokens = async (req, res) => {
    try {
        // Get the refresh token from cookies
        const refreshToken = req.cookies.refreshToken;

        // Check if the refresh token exists
        if (!refreshToken) {
            return res.status(401).json({ message: "No refresh token provided" });
        }

        // Verify the refresh token
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

        // Check if the refresh token exists in Redis
        const storedToken = await redis.get(decoded.userId.toString());
        if (storedToken !== refreshToken) {
            return res.status(401).json({ message: "Invalid refresh token" });
        }

        // Generate a new access token
        const accessToken = jwt.sign(
            { userId: decoded.userId },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN }
        );

        // Set the new access token in cookies
        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 15 * 60 * 1000, // 15 minutes
        });

        // Send the new access token in the response
        res.status(200).json({
            message: "Token refreshed successfully",
            accessToken,
        });
    } catch (error) {
        res.status(401).json({ message: "Invalid refresh token" });
    }
}

// the logique to display profile User info
// export const getProfile = async (req,res) => {

// }