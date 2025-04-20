import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {  useEffect } from 'react';
import { useError } from '../context/ErrorContext';

const ProtectedRoute = ({ children }) => {
    const { user } = useAuth();
    const { showError } = useError();

    // Use useEffect to call showError after render
    useEffect(() => {
        if (!user) {
            showError("Unauthorized user");
        }
    }, [user, showError]);  // Effect runs when isAuthenticated changes

    if (!user) {
        return <Navigate to="/login" />;
    }
    
    return children;
};

export default ProtectedRoute;
