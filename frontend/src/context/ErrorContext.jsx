import React, { createContext, useState, useContext } from 'react';

// Create the ErrorContext
const ErrorContext = createContext();

// Create a custom hook to access the ErrorContext
export const useError = () => {
    return useContext(ErrorContext);  // Allows child components to access showError
};

// ErrorProvider Component
export const ErrorProvider = ({ children }) => {
    const [error, setError] = useState(null);

    // Function to show an error message
    const showError = (message) => {
        setError(message);
        setTimeout(() => setError(null), 5000);  // Clear the error message after 5 seconds
    };

    return (
        <ErrorContext.Provider value={{ showError }}>
            {children}
            {error && (
                <div 
                    className="error-alert" 
                    style={{
                        backgroundColor: '#f8d7da', 
                        color: '#721c24', 
                        padding: '10px', 
                        borderRadius: '5px', 
                        marginTop: '10px', 
                        fontWeight: 'bold',
                        border: '1px solid red',
                        textAlign: 'center',
                        position: 'absolute', 
                        top: '10px', 
                        left: '50%', 
                        transform: 'translateX(-50%)',
                    }}
                >
                    {error} {/* Display the error message */}
                </div>
            )}
        </ErrorContext.Provider>
    );
};
