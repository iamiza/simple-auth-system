const jwt = require ("jsonwebtoken");

const authToken = (req,res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).json({message: "Token missing"});

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({message: "Invalid Token"});
        //console.log("Token decoded:", user);
        req.user = user;
        next();
    });
};

module.exports = {authToken};