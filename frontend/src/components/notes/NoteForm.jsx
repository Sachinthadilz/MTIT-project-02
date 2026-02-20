import { useState } from 'react';
import { FiPlus, FiLoader } from 'react-icons/fi';

const NoteForm = ({ onAdd }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const validate = () => {
        const newErrors = {};
        if (!title.trim()) newErrors.title = 'Title is required';
        if (!content.trim()) newErrors.content = 'Content is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        setIsSubmitting(true);
        const success = await onAdd({ title, content });
        setIsSubmitting(false);

        if (success) {
            setTitle('');
            setContent('');
            setErrors({});
        }
    };

    const handleChange = (e, setter, fieldName) => {
        setter(e.target.value);
        if (errors[fieldName]) {
            setErrors(prev => ({ ...prev, [fieldName]: null }));
        }
    };

    return (
        <div className="bg-white shadow sm:rounded-lg mb-8 border border-gray-100">
            <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Create New Note</h3>
                <form onSubmit={onSubmit} className="space-y-4" noValidate>
                    <div>
                        <label htmlFor="title" className="sr-only">Title</label>
                        <input
                            type="text"
                            name="title"
                            id="title"
                            value={title}
                            onChange={(e) => handleChange(e, setTitle, 'title')}
                            className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md py-2 px-3 border transition-colors ${errors.title ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''
                                }`}
                            placeholder="Note Title"
                            aria-invalid={errors.title ? "true" : "false"}
                            aria-describedby={errors.title ? "title-error" : undefined}
                        />
                        {errors.title && <p className="mt-1 text-sm text-red-600" id="title-error" role="alert">{errors.title}</p>}
                    </div>

                    <div>
                        <label htmlFor="content" className="sr-only">Content</label>
                        <textarea
                            id="content"
                            name="content"
                            rows={3}
                            value={content}
                            onChange={(e) => handleChange(e, setContent, 'content')}
                            className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md py-2 px-3 transition-colors resize-none ${errors.content ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''
                                }`}
                            placeholder="Write your note down here..."
                            aria-invalid={errors.content ? "true" : "false"}
                            aria-describedby={errors.content ? "content-error" : undefined}
                        />
                        {errors.content && <p className="mt-1 text-sm text-red-600" id="content-error" role="alert">{errors.content}</p>}
                    </div>

                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            aria-busy={isSubmitting}
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-70 disabled:cursor-not-allowed transition-colors"
                        >
                            {isSubmitting ? (
                                <>
                                    <FiLoader className="animate-spin -ml-1 mr-2 h-4 w-4" aria-hidden="true" />
                                    Saving...
                                </>
                            ) : (
                                <>
                                    <FiPlus className="-ml-1 mr-2 h-4 w-4" aria-hidden="true" />
                                    Add Note
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default NoteForm;
