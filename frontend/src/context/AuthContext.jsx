import { createContext, useState, useEffect } from 'react';
import api from '../api/axios';
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
                    const res = await api.get('/auth/me');
                    setUser(res.data);
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
            const res = await api.post('/auth/register', userData);
            const { token, ...userDataWithoutToken } = res.data;

            setToken(token);
            setUser(userDataWithoutToken);
            localStorage.setItem('token', token);
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
            const res = await api.post('/auth/login', credentials);
            const { token, ...userDataWithoutToken } = res.data;

            setToken(token);
            setUser(userDataWithoutToken);
            localStorage.setItem('token', token);
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
