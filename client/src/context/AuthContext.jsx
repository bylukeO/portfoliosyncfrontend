import { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [token, setToken] = useState(localStorage.getItem('auth_token'));
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Fetch user data when token changes
    useEffect(() => {
        async function fetchUser() {
            if (!token) {
                setUser(null);
                setLoading(false);
                return;
            }

            try {
                const response = await api.get('/auth/me');
                setUser(response.data.user);
            } catch (error) {
                console.error('Failed to fetch user:', error);
                // Token might be invalid or expired
                if (error.response?.status === 401) {
                    localStorage.removeItem('auth_token');
                    setToken(null);
                    setUser(null);
                }
            } finally {
                setLoading(false);
            }
        }

        fetchUser();
    }, [token]);

    const login = async () => {
        try {
            // Get the GitHub OAuth URL from backend
            const response = await api.get('/auth/github');
            // Redirect to GitHub
            window.location.href = response.data.authURL;
        } catch (error) {
            console.error('Failed to initiate login:', error);
            throw error;
        }
    };

    const logout = async () => {
        try {
            await api.post('/auth/logout');
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            localStorage.removeItem('auth_token');
            setToken(null);
            setUser(null);
        }
    };

    const value = {
        token,
        setToken,
        user,
        loading,
        isAuthenticated: !!token && !!user,
        login,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
