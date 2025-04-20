import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
const AuthContext = createContext();
const apiURL = process.env.REACT_APP_API_URL

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    useEffect(() => {
        axios.get(`${apiURL}/verify`, {
            withCredentials: true
        })
        .then(response => {
            setUser(response.data);
        })
        .catch(error => {
            console.log('Error verifying token:', error);
            setUser(null);
            setIsAuthenticated(false);
        });
    }, []);
    

    const login = async () => {
        try {
            const response = await axios.get(`${apiURL}/verify`, {
                withCredentials: true,
            });
            setIsAuthenticated(true);
            setUser(response.data);
            return response.data;
        } catch (error) {
            console.error('Login verification failed:', error);
            setUser(null);
        }
    };
    

    const logout = async () => {
        await axios.post(`${apiURL}/logout`, null, {withCredentials: true});
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout , isAuthenticated}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => React.useContext(AuthContext);
