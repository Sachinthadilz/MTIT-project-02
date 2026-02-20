import { Navigate, Outlet, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import Spinner from '../components/layout/Spinner';

const ProtectedRoute = () => {
    const { token, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return <div className="h-screen flex items-center justify-center"><Spinner /></div>;
    }

    return token ? (
        <Outlet />
    ) : (
        <Navigate to="/login" state={{ from: location }} replace />
    );
};

export default ProtectedRoute;
