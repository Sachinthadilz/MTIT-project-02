import { createContext, useState, useEffect } from 'react';
import authService from '../services/authService';
import { toast } from 'react-toastify';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token') || null);
    const [loading, setLoading] = useState(true);

    // Initial load: Check if token exists and fetch user
    useEffect(() => {
        const verifyUser = async () => {
            if (token) {
                try {
                    const userData = await authService.verifyToken();
                    setUser(userData);
                } catch (error) {
                    console.error("Token verification failed:", error);
                    logout(); // Token is invalid/expired
                }
            }
            setLoading(false);
        };
        verifyUser();
    }, [token]);

    const register = async (userData) => {
        setLoading(true);
        try {
            const data = await authService.register(userData);
            const { token: receivedToken, ...userDataWithoutToken } = data;

            setToken(receivedToken);
            setUser(userDataWithoutToken);
            localStorage.setItem('token', receivedToken);
            toast.success("Registration successful!");
            return true;
        } catch (error) {
            const message = error.response?.data?.message || error.response?.data?.errors?.[0]?.msg || "Registration failed";
            toast.error(message);
            return false;
        } finally {
            setLoading(false);
        }
    };

    const login = async (credentials) => {
        setLoading(true);
        try {
            const data = await authService.login(credentials);
            const { token: receivedToken, ...userDataWithoutToken } = data;

            setToken(receivedToken);
            setUser(userDataWithoutToken);
            localStorage.setItem('token', receivedToken);
            toast.success("Login successful!");
            return true;
        } catch (error) {
            const message = error.response?.data?.message || "Invalid credentials";
            toast.error(message);
            return false;
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('token');
        toast.info("Logged out successfully");
    };

    return (
        <AuthContext.Provider value={{ user, token, loading, register, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
