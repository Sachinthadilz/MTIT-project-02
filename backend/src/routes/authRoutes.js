const express = require("express");
const router = express.Router();
const rateLimit = require("express-rate-limit");
const {
    registerUser,
    loginUser,
    getMe,
} = require("../controllers/authController");
const { protect } = require("../middlewares/authMiddleware");
const { body, validationResult } = require("express-validator");

// Rate limiting for auth routes
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10, // Limit each IP to 10 requests per windowMs
    message: { message: "Too many login/register attempts from this IP, please try again after 15 minutes" },
});

// Validation middleware
const validateRegister = [
    body("name")
        .trim()
        .notEmpty().withMessage("Name is required")
        .isLength({ max: 50 }).withMessage("Name cannot exceed 50 characters")
        .escape(),
    body("email")
        .trim()
        .isEmail().withMessage("Please include a valid email")
        .isLength({ max: 100 }).withMessage("Email cannot exceed 100 characters")
        .normalizeEmail(),
    body("password")
        .isLength({ min: 6, max: 128 }).withMessage("Password must be between 6 and 128 characters"),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];

const validateLogin = [
    body("email")
        .trim()
        .isEmail().withMessage("Please include a valid email")
        .normalizeEmail(),
    body("password").exists().withMessage("Password is required"),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];

router.post("/register", authLimiter, validateRegister, registerUser);
router.post("/login", authLimiter, validateLogin, loginUser);
router.get("/me", protect, getMe);

module.exports = router;
