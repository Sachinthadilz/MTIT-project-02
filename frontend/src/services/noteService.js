import api from '../api/axios';

const noteService = {
    getAllNotes: async () => {
        const response = await api.get('/notes');
        return response.data;
    },

    createNote: async (noteData) => {
        const response = await api.post('/notes', noteData);
        return response.data;
    },

    updateNote: async (id, updatedData) => {
        const response = await api.put(`/notes/${id}`, updatedData);
        return response.data;
    },

    deleteNote: async (id) => {
        const response = await api.delete(`/notes/${id}`);
        return response.data;
    }
};

export default noteService;
