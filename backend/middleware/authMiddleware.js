import jwt from "jsonwebtoken";
import User from "../models/user..model.js";

export const protect = async (req, res, next) => {
    let token;

    // Get token from headers
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
        return res.status(401).json({ message: "Not authorized, no token" });
    }

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        req.user = await User.findById(decoded.userId).select("-password");
        next();
    } catch (error) {
        res.status(401).json({ message: "Not authorized, token failed" });
    }
};