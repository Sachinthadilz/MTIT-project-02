import { useState, useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import api from '../api/axios';
import { toast } from 'react-toastify';
import Spinner from '../components/layout/Spinner';
import NoteForm from '../components/notes/NoteForm';
import NoteItem from '../components/notes/NoteItem';
import EditModal from '../components/notes/EditModal';
import DeleteModal from '../components/notes/DeleteModal';
import { FiFileText } from 'react-icons/fi';

const Home = () => {
    const { user } = useAuth();

    // Notes State
    const [notes, setNotes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Modal States
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedNoteToEdit, setSelectedNoteToEdit] = useState(null);

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [noteIdToDelete, setNoteIdToDelete] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);

    // Fetch notes on mount
    useEffect(() => {
        fetchNotes();
    }, []);

    const fetchNotes = async () => {
        try {
            const res = await api.get('/notes');
            setNotes(res.data);
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to fetch notes');
        } finally {
            setIsLoading(false);
        }
    };

    // --- CRUD Handlers ---

    const handleAddNote = async (noteData) => {
        try {
            const res = await api.post('/notes', noteData);
            // Prepend new note to the list to avoid a full re-fetch
            setNotes([res.data, ...notes]);
            toast.success('Note added successfully!');
            return true;
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to add note');
            return false;
        }
    };

    const handleUpdateNote = async (id, updatedData) => {
        try {
            const res = await api.put(`/notes/${id}`, updatedData);
            // Update local state instantly
            setNotes(notes.map(note => note._id === id ? res.data : note));
            setIsEditModalOpen(false);
            toast.success('Note updated successfully!');
            return true;
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to update note');
            return false;
        }
    };

    const handleDeleteNote = async (id) => {
        setIsDeleting(true);
        try {
            await api.delete(`/notes/${id}`);
            // Remove from local state
            setNotes(notes.filter(note => note._id !== id));
            setIsDeleteModalOpen(false);
            toast.success('Note deleted successfully!');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to delete note');
        } finally {
            setIsDeleting(false);
        }
    };

    // --- Modal Triggers ---

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
            <NoteForm onAdd={handleAddNote} />

            {/* Notes Grid Display */}
            <div className="flex-grow">
                {isLoading ? (
                    <Spinner />
                ) : notes.length > 0 ? (
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

            {/* Modals outside the normal flow */}
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
