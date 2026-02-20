const { validationResult, body, param } = require("express-validator");

// Generic Error formatter for express-validator
const validateRequest = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

// --- AUTH VALIDATIONS ---
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
    validateRequest
];

const validateLogin = [
    body("email")
        .trim()
        .isEmail().withMessage("Please include a valid email")
        .normalizeEmail(),
    body("password").exists().withMessage("Password is required"),
    validateRequest
];

// --- NOTE VALIDATIONS ---
const noteValidationRules = [
    body("title")
        .trim()
        .notEmpty().withMessage("Title is required")
        .isLength({ max: 100 }).withMessage("Title cannot exceed 100 characters")
        .escape(),
    body("content")
        .trim()
        .notEmpty().withMessage("Content is required")
        .isLength({ max: 5000 }).withMessage("Content cannot exceed 5000 characters")
        .escape(),
    validateRequest
];

const noteIdValidationRule = [
    param("id").isMongoId().withMessage("Invalid note ID format"),
    validateRequest
];

module.exports = {
    validateRegister,
    validateLogin,
    noteValidationRules,
    noteIdValidationRule
};
