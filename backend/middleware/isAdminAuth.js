const isAdmin = (req, res, next) => {
    if (req.user && req.user.role === "admin") {
        return next(); 
    }

    return res.status(403).json({ message: "Forbidden: Admins only" });
};

export default isAdmin;