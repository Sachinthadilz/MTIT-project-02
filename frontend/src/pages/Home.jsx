import useAuth from '../hooks/useAuth';

const Home = () => {
    const { user } = useAuth();

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="bg-white shadow overflow-hidden sm:rounded-lg border border-gray-200">
                <div className="px-4 py-5 sm:px-6 bg-indigo-50">
                    <h3 className="text-lg leading-6 font-medium text-indigo-900">
                        Dashboard
                    </h3>
                    <p className="mt-1 max-w-2xl text-sm text-indigo-700">
                        Welcome back, {user?.name}!
                    </p>
                </div>
                <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
                    <p className="text-gray-500">
                        This is a protected route. You can only see this if you have a valid JWT token.
                        The token is securely attached to API requests by the Axios interceptor.
                    </p>

                    {/* Placeholder for future Notes feature */}
                    <div className="mt-8 p-6 bg-gray-50 border border-dashed border-gray-300 rounded-md text-center">
                        <p className="text-gray-400 flex flex-col items-center">
                            <span className="block mb-2">Your Notes will appear here once implemented.</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
