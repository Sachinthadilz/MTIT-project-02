import { FiEdit2, FiTrash2 } from 'react-icons/fi';

const NoteItem = ({ note, onEditClick, onDeleteClick }) => {

    // Format the date nicely
    const formattedDate = new Date(note.updatedAt || note.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });

    return (
        <div className="bg-white overflow-hidden shadow sm:rounded-lg border border-gray-200 hover:shadow-md transition-shadow duration-200 flex flex-col h-full">
            <div className="px-4 py-5 sm:p-6 flex-grow">
                <h4 className="text-lg font-bold text-gray-900 mb-2 truncate" title={note.title}>
                    {note.title}
                </h4>
                <p className="text-sm text-gray-600 whitespace-pre-wrap break-words line-clamp-4">
                    {note.content}
                </p>
            </div>

            <div className="bg-gray-50 px-4 py-3 border-t border-gray-100 flex justify-between items-center mt-auto">
                <span className="text-xs text-gray-400">
                    {formattedDate}
                </span>
                <div className="flex space-x-2">
                    <button
                        onClick={() => onEditClick(note)}
                        className="text-gray-400 hover:text-indigo-600 p-1.5 rounded-md hover:bg-indigo-50 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        title="Edit Note"
                        aria-label={`Edit note: ${note.title}`}
                    >
                        <FiEdit2 aria-hidden="true" />
                    </button>
                    <button
                        onClick={() => onDeleteClick(note._id)}
                        className="text-gray-400 hover:text-red-600 p-1.5 rounded-md hover:bg-red-50 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500"
                        title="Delete Note"
                        aria-label={`Delete note: ${note.title}`}
                    >
                        <FiTrash2 aria-hidden="true" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NoteItem;
