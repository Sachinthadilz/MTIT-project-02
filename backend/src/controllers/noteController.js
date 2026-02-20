const Note = require("../models/Note");

// @desc    Get notes
// @route   GET /api/notes
// @access  Private
const getNotes = async (req, res) => {
    // Only fetch notes that belong to the authenticated user
    const notes = await Note.find({ user: req.user.id });
    res.status(200).json(notes);
};

// @desc    Set note
// @route   POST /api/notes
// @access  Private
const setNote = async (req, res) => {
    // Basic validation handled by express-validator, but double checking here
    if (!req.body.title || !req.body.content) {
        res.status(400);
        throw new Error("Please add a title and content field");
    }

    const note = await Note.create({
        title: req.body.title,
        content: req.body.content,
        user: req.user.id, // Strictly tie it to the authenticated user
    });

    res.status(201).json(note);
};

// @desc    Update note
// @route   PUT /api/notes/:id
// @access  Private
const updateNote = async (req, res) => {
    const note = await Note.findById(req.params.id);

    // 1. Check if note exists
    if (!note) {
        res.status(404);
        throw new Error("Note not found");
    }

    // 2. Check for user (req.user is set by authMiddleware)
    if (!req.user) {
        res.status(401);
        throw new Error("User not found");
    }

    // 3. OWNERSHIP VALIDATION: Make sure the logged in user matches the note user
    if (note.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error("User not authorized");
    }


    // Update only allowed fields (title and content)
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
};

// @desc    Delete note
// @route   DELETE /api/notes/:id
// @access  Private
const deleteNote = async (req, res) => {
    const note = await Note.findById(req.params.id);

    // 1. Check if note exists
    if (!note) {
        res.status(404);
        throw new Error("Note not found");
    }

    // 2. Check for user
    if (!req.user) {
        res.status(401);
        throw new Error("User not found");
    }

    // 3. OWNERSHIP VALIDATION: Make sure the logged in user matches the note user
    if (note.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error("User not authorized");
    }

    await note.deleteOne();

    res.status(200).json({ id: req.params.id });
};

module.exports = {
    getNotes,
    setNote,
    updateNote,
    deleteNote,
};
