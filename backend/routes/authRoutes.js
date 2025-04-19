const express = require("express");
const router = express.Router();
const { register, login, logout } = require("../controllers/authController");
const { authToken } = require('../middleware/authenticateToken');

router.get('/verify', authToken, (req, res) => {
    res.json(req.user);
});
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

module.exports = router;