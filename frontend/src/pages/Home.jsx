import { useState, useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import { useNotes } from '../hooks/useNotes';
import Spinner from '../components/layout/Spinner';
import NoteForm from '../components/notes/NoteForm';
import NoteItem from '../components/notes/NoteItem';
import EditModal from '../components/notes/EditModal';
import DeleteModal from '../components/notes/DeleteModal';
import { FiFileText } from 'react-icons/fi';

const Home = () => {
    const { user } = useAuth();

    // Abstracted Logic
    const {
        notes,
        isLoading,
        fetchNotes,
        addNote,
        updateNote,
        deleteNote
    } = useNotes();

    // UI-Only Modal States
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedNoteToEdit, setSelectedNoteToEdit] = useState(null);

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [noteIdToDelete, setNoteIdToDelete] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);

    // Initial Fetch
    useEffect(() => {
        fetchNotes();
    }, [fetchNotes]);

    // UI Proxy Handlers
    const handleUpdateNote = async (id, updatedData) => {
        const success = await updateNote(id, updatedData);
        if (success) setIsEditModalOpen(false);
    };

    const handleDeleteNote = async (id) => {
        setIsDeleting(true);
        const success = await deleteNote(id);
        if (success) setIsDeleteModalOpen(false);
        setIsDeleting(false);
    };

    const openEditModal = (note) => {
        setSelectedNoteToEdit(note);
        setIsEditModalOpen(true);
    };

    const openDeleteModal = (id) => {
        setNoteIdToDelete(id);
        setIsDeleteModalOpen(true);
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 h-full flex flex-col">
            {/* Header Area */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                    <FiFileText className="mr-3 text-indigo-600" />
                    {user?.name}'s Dashboard
                </h1>
                <p className="mt-2 text-sm text-gray-600">
                    Manage your personal, secure notes below.
                </p>
            </div>

            {/* Note Creation Form */}
            <NoteForm onAdd={addNote} />

            {/* Notes Grid Display */}
            <div className="flex-grow">
                {isLoading ? (
                    <Spinner />
                ) : notes?.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {notes.map((note) => (
                            <NoteItem
                                key={note._id}
                                note={note}
                                onEditClick={openEditModal}
                                onDeleteClick={openDeleteModal}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16 bg-white border border-dashed border-gray-300 rounded-lg">
                        <FiFileText className="mx-auto h-12 w-12 text-gray-400" />
                        <h3 className="mt-2 text-sm font-medium text-gray-900">No notes found</h3>
                        <p className="mt-1 text-sm text-gray-500">
                            Get started by creating a new note above.
                        </p>
                    </div>
                )}
            </div>

            {/* Modals */}
            <EditModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                note={selectedNoteToEdit}
                onUpdate={handleUpdateNote}
            />

            <DeleteModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                noteId={noteIdToDelete}
                onDelete={handleDeleteNote}
                isDeleting={isDeleting}
            />
        </div>
    );
};

export default Home;
