const express = require("express");
const router = express.Router();
const rateLimit = require("express-rate-limit");
const {
    registerUser,
    loginUser,
    getMe,
} = require("../controllers/authController");
const { protect } = require("../middlewares/authMiddleware");
const { validateRegister, validateLogin } = require("../middlewares/validationMiddleware");

// Rate limiting for auth routes
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 50, // Limit each IP to 50 requests per windowMs
    skip: (req) => req.method === "OPTIONS", // Allow CORS preflight requests without rate limiting
    message: { message: "Too many login/register attempts from this IP, please try again after 15 minutes" },
});

router.post("/register", authLimiter, validateRegister, registerUser);
router.post("/login", authLimiter, validateLogin, loginUser);
router.get("/me", protect, getMe);

module.exports = router;
