const express = require("express");
const router = express.Router();
const {
    getNotes,
    setNote,
    updateNote,
    deleteNote,
} = require("../controllers/noteController");

const { protect } = require("../middlewares/authMiddleware");
const { checkNoteOwnership } = require("../middlewares/ownershipMiddleware");
const {
    noteValidationRules,
    noteIdValidationRule
} = require("../middlewares/validationMiddleware");

// All routes are protected
router.use(protect);

// Routes
router.route("/")
    .get(getNotes)
    .post(noteValidationRules, setNote);

router.route("/:id")
    // PUT requires valid ID format, valid body, AND ownership validation
    .put(noteIdValidationRule, checkNoteOwnership, noteValidationRules, updateNote)
    // DELETE requires valid ID format AND ownership validation
    .delete(noteIdValidationRule, checkNoteOwnership, deleteNote);

module.exports = router;
