import { FiX, FiTrash2, FiLoader, FiAlertTriangle } from 'react-icons/fi';

const DeleteModal = ({ isOpen, onClose, noteId, onDelete, isDeleting }) => {

    if (!isOpen || !noteId) return null;

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
                    onClick={!isDeleting ? onClose : undefined}
                ></div>

                {/* Vertical centering trick */}
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                {/* Modal panel */}
                <div
                    onClick={handleContentClick}
                    className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg w-full"
                >
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 border-b border-gray-100">
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center">
                                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                    <FiAlertTriangle className="h-6 w-6 text-red-600" aria-hidden="true" />
                                </div>
                                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                    <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                                        Delete Note
                                    </h3>
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={onClose}
                                disabled={isDeleting}
                                className="text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-md disabled:opacity-50"
                                aria-label="Close"
                            >
                                <FiX className="h-6 w-6" aria-hidden="true" />
                            </button>
                        </div>

                        <div className="sm:pl-14">
                            <p className="text-sm text-gray-500">
                                Are you sure you want to delete this note? This action cannot be undone and the data will be permanently lost.
                            </p>
                        </div>
                    </div>

                    <div className="bg-gray-50 px-4 py-3 sm:px-6 flex flex-row-reverse space-x-reverse space-x-3">
                        <button
                            type="button"
                            onClick={() => onDelete(noteId)}
                            disabled={isDeleting}
                            aria-busy={isDeleting}
                            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:w-auto sm:text-sm disabled:opacity-70 disabled:cursor-not-allowed transition-colors"
                        >
                            {isDeleting ? (
                                <>
                                    <FiLoader className="animate-spin -ml-1 mr-2 h-4 w-4" aria-hidden="true" />
                                    Deleting...
                                </>
                            ) : (
                                <>
                                    <FiTrash2 className="-ml-1 mr-2 h-4 w-4 mt-0.5" aria-hidden="true" />
                                    Delete Note
                                </>
                            )}
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={isDeleting}
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

export default DeleteModal;
