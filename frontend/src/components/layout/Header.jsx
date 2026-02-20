import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { FiLogOut, FiUser, FiLogIn, FiUserPlus } from 'react-icons/fi';

const Header = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const onLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <header className="bg-white shadow">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <div className="flex-shrink-0">
                        <Link to="/" className="text-2xl font-bold text-indigo-600">
                            NotesApp
                        </Link>
                    </div>
                    <div>
                        {user ? (
                            <div className="flex items-center space-x-6">
                                <span className="flex items-center text-gray-700">
                                    <FiUser className="mr-2" />
                                    {user.name}
                                </span>
                                <button
                                    onClick={onLogout}
                                    className="flex items-center text-gray-500 hover:text-indigo-600 transition-colors"
                                >
                                    <FiLogOut className="mr-1" />
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center space-x-4">
                                <Link
                                    to="/login"
                                    className="flex items-center text-gray-500 hover:text-indigo-600 transition-colors"
                                >
                                    <FiLogIn className="mr-1" />
                                    Login
                                </Link>
                                <Link
                                    to="/register"
                                    className="flex items-center flex-row bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
                                >
                                    <FiUserPlus className="mr-1" />
                                    Register
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
