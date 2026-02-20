const express = require("express");
const router = express.Router();
const {
    getNotes,
    setNote,
    updateNote,
    deleteNote,
} = require("../controllers/noteController");

const { protect } = require("../middlewares/authMiddleware");
const { body, param, validationResult } = require("express-validator");

// Error formatter for express-validator
const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

// Validation chains
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
];

const idValidationRule = [
    param("id")
        .isMongoId().withMessage("Invalid note ID format"),
];

// All routes are protected
router.use(protect);

// Routes
router.route("/")
    .get(getNotes)
    .post(noteValidationRules, validate, setNote);

router.route("/:id")
    .put(idValidationRule, noteValidationRules, validate, updateNote)
    .delete(idValidationRule, validate, deleteNote);

module.exports = router;
