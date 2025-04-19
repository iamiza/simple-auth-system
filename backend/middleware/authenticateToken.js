const jwt = require("jsonwebtoken");

const authToken = (req, res, next) => {
    const token = req.cookies.token; // get token from httpOnly cookie

    if (!token) return res.status(401).json({ message: "Token missing" });

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: "Invalid Token" });

        req.user = user;
        next();
    });
};

module.exports = { authToken };
