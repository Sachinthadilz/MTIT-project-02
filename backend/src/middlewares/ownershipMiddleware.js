const asyncHandler = require("express-async-handler");
const Note = require("../models/Note");

/**
 * Middleware to check if the currently authenticated user
 * is the actual owner of the note they are trying to access/modify.
 * MUST be used AFTER the `protect` authMiddleware.
 */
const checkNoteOwnership = asyncHandler(async (req, res, next) => {
    const noteId = req.params.id;
    const userId = req.user.id; // populated by protect middleware

    const note = await Note.findById(noteId);

    if (!note) {
        res.status(404);
        throw new Error("Note not found");
    }

    // Ownership validation
    if (note.user.toString() !== userId) {
        res.status(401);
        throw new Error("User not authorized to access this note");
    }

    // Attach the fetched note to the request object to avoid re-querying in the controller
    req.note = note;

    next();
});

module.exports = { checkNoteOwnership };
