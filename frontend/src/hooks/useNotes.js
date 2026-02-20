import { useState, useCallback } from 'react';
import noteService from '../services/noteService';
import { toast } from 'react-toastify';

export const useNotes = () => {
    const [notes, setNotes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchNotes = useCallback(async () => {
        setIsLoading(true);
        try {
            const data = await noteService.getAllNotes();
            setNotes(data);
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to fetch notes');
        } finally {
            setIsLoading(false);
        }
    }, []);

    const addNote = async (noteData) => {
        try {
            const newNote = await noteService.createNote(noteData);
            setNotes(prev => [newNote, ...prev]);
            toast.success('Note added successfully!');
            return true;
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to add note');
            return false;
        }
    };

    const updateNote = async (id, updatedData) => {
        try {
            const updatedNote = await noteService.updateNote(id, updatedData);
            setNotes(prev => prev.map(note => note._id === id ? updatedNote : note));
            toast.success('Note updated successfully!');
            return true;
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to update note');
            return false;
        }
    };

    const deleteNote = async (id) => {
        try {
            await noteService.deleteNote(id);
            setNotes(prev => prev.filter(note => note._id !== id));
            toast.success('Note deleted successfully!');
            return true;
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to delete note');
            return false;
        }
    };

    return {
        notes,
        isLoading,
        fetchNotes,
        addNote,
        updateNote,
        deleteNote
    };
};
