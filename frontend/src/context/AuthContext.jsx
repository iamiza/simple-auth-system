import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    useEffect(() => {
        axios.get('http://localhost:5000/verify', {
            withCredentials: true
        })
        .then(response => {
            setUser(response.data);
        })
        .catch(error => {
            console.log('Error verifying token:', error);
            setUser(null);
        });
    }, []);
    

    const login = async () => {
        try {
            const response = await axios.get('http://localhost:5000/verify', {
                withCredentials: true,
            });
            setUser(response.data);
            return response.data;
        } catch (error) {
            console.error('Login verification failed:', error);
            setUser(null);
        }
    };
    

    const logout = async () => {
        await axios.post('http://localhost:5000/logout', null, {withCredentials: true});
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => React.useContext(AuthContext);
