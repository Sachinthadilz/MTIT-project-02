import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="min-h-[80vh] flex flex-col justify-center items-center text-center px-4">
            <h1 className="text-6xl font-extrabold text-indigo-600 mb-4">404</h1>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Page Not Found</h2>
            <p className="text-xl text-gray-600 mb-8">The page you're looking for doesn't exist.</p>
            <Link
                to="/"
                className="bg-indigo-600 text-white px-6 py-3 rounded-md font-medium hover:bg-indigo-700 transition"
            >
                Return to Dashboard
            </Link>
        </div>
    );
};

export default NotFound;
