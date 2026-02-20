import { useState, useEffect } from 'react';
import { FiX, FiSave, FiLoader } from 'react-icons/fi';

const EditModal = ({ isOpen, onClose, note, onUpdate }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Populate form when modal opens with a note
    useEffect(() => {
        if (note && isOpen) {
            setTitle(note.title);
            setContent(note.content);
            setErrors({});
            setIsSubmitting(false);
        }
    }, [note, isOpen]);

    if (!isOpen) return null;

    const validate = () => {
        const newErrors = {};
        if (!title.trim()) newErrors.title = 'Title is required';
        if (!content.trim()) newErrors.content = 'Content is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e, setter, fieldName) => {
        setter(e.target.value);
        if (errors[fieldName]) {
            setErrors(prev => ({ ...prev, [fieldName]: null }));
        }
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        setIsSubmitting(true);
        // Pass the updated data along with the original note ID back to parent
        await onUpdate(note._id, { title, content });
        // The parent (Home.jsx) will handle closing the modal upon success
        // Because if it fails, we want the modal to stay open so they can retry/fix
        setIsSubmitting(false);
    };

    // Prevent clicks inside the modal content from closing it
    const handleContentClick = (e) => {
        e.stopPropagation();
    };

    return (
        <div
            className="fixed z-50 inset-0 overflow-y-auto"
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
        >
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">

                {/* Background overlay */}
                <div
                    className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                    aria-hidden="true"
                    onClick={!isSubmitting ? onClose : undefined}
                ></div>

                {/* Vertical centering trick */}
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                {/* Modal panel */}
                <div
                    onClick={handleContentClick}
                    className="relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transition-all sm:my-8 sm:align-middle sm:max-w-lg w-full"
                >
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 border-b border-gray-100">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                                Edit Note
                            </h3>
                            <button
                                type="button"
                                onClick={onClose}
                                disabled={isSubmitting}
                                className="text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-md disabled:opacity-50"
                                aria-label="Close"
                            >
                                <FiX className="h-6 w-6" aria-hidden="true" />
                            </button>
                        </div>

                        <form id="edit-note-form" onSubmit={onSubmit} noValidate>
                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="edit-title" className="block text-sm font-medium text-gray-700">Title</label>
                                    <input
                                        type="text"
                                        name="title"
                                        id="edit-title"
                                        value={title}
                                        onChange={(e) => handleChange(e, setTitle, 'title')}
                                        className={`mt-1 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm rounded-md py-2 px-3 border transition-colors ${errors.title ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300'
                                            }`}
                                        aria-invalid={errors.title ? "true" : "false"}
                                        aria-describedby={errors.title ? "edit-title-error" : undefined}
                                    />
                                    {errors.title && <p className="mt-1 text-sm text-red-600" id="edit-title-error" role="alert">{errors.title}</p>}
                                </div>

                                <div>
                                    <label htmlFor="edit-content" className="block text-sm font-medium text-gray-700">Content</label>
                                    <textarea
                                        id="edit-content"
                                        name="content"
                                        rows={4}
                                        value={content}
                                        onChange={(e) => handleChange(e, setContent, 'content')}
                                        className={`mt-1 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm rounded-md py-2 px-3 border transition-colors resize-none ${errors.content ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300'
                                            }`}
                                        aria-invalid={errors.content ? "true" : "false"}
                                        aria-describedby={errors.content ? "edit-content-error" : undefined}
                                    />
                                    {errors.content && <p className="mt-1 text-sm text-red-600" id="edit-content-error" role="alert">{errors.content}</p>}
                                </div>
                            </div>
                        </form>
                    </div>

                    <div className="bg-gray-50 px-4 py-3 sm:px-6 flex flex-row-reverse space-x-reverse space-x-3">
                        <button
                            type="submit"
                            form="edit-note-form"
                            disabled={isSubmitting}
                            aria-busy={isSubmitting}
                            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:w-auto sm:text-sm disabled:opacity-70 disabled:cursor-not-allowed transition-colors"
                        >
                            {isSubmitting ? (
                                <>
                                    <FiLoader className="animate-spin -ml-1 mr-2 h-4 w-4" aria-hidden="true" />
                                    Saving...
                                </>
                            ) : (
                                <>
                                    <FiSave className="-ml-1 mr-2 h-4 w-4 mt-0.5" aria-hidden="true" />
                                    Save Changes
                                </>
                            )}
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={isSubmitting}
                            className="mt-3 sm:mt-0 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:w-auto sm:text-sm disabled:opacity-50 transition-colors"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditModal;
