const asyncHandler = require("express-async-handler");
const Note = require("../models/Note");

// @desc    Get notes
// @route   GET /api/notes
// @access  Private
const getNotes = asyncHandler(async (req, res) => {
    // Only fetch notes that belong to the authenticated user
    const notes = await Note.find({ user: req.user.id });
    res.status(200).json(notes);
});

// @desc    Set note
// @route   POST /api/notes
// @access  Private
const setNote = asyncHandler(async (req, res) => {
    const note = await Note.create({
        title: req.body.title,
        content: req.body.content,
        user: req.user.id, // Strictly tie it to the authenticated user
    });

    res.status(201).json(note);
});

// @desc    Update note
// @route   PUT /api/notes/:id
// @access  Private
const updateNote = asyncHandler(async (req, res) => {
    // Note existing & ownership is already validated by checkNoteOwnership middleware
    // We do NOT use req.body directly to prevent mass assignment (e.g., reassigning user)
    const updatedNote = await Note.findByIdAndUpdate(
        req.params.id,
        {
            title: req.body.title,
            content: req.body.content
        },
        { returnDocument: "after", runValidators: true }
    );

    res.status(200).json(updatedNote);
});

// @desc    Delete note
// @route   DELETE /api/notes/:id
// @access  Private
const deleteNote = asyncHandler(async (req, res) => {
    // Note existing & ownership is already validated by checkNoteOwnership middleware (available on req.note)

    await req.note.deleteOne();

    res.status(200).json({ id: req.params.id });
});

module.exports = {
    getNotes,
    setNote,
    updateNote,
    deleteNote,
};
