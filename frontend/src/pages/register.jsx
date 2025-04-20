import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {useError} from '../context/ErrorContext'
const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();
    const { showError } = useError(); // Use the showError function from context
    const handleRegistration = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/register', {username, email, password },{withCredentials:true});
            await login(); // Store token in httpOnly cookie
            navigate('/tasks');
        } catch (error) {
            if (error.response) {
                // If the error response exists, display the message sent from the backend
                console.log('Registration error:', error.response.data.message);
                showError(error.response.data.message);  // Show backend error message
            } else {
                console.log('Unexpected error:', error);
                showError('Something went wrong, please try again later.');
            }
            setUsername("");
            setEmail("");
            setPassword("");
        }
        
    };

    return (
        <div className="container">
            <div className="card">
                <h1>Register</h1>
                <form onSubmit={handleRegistration}>
                    <div className="input">
                        <input className="input-field" type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" required />

                        <input className="input-field" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
                        <input className="input-field" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />


                    </div>
                    <button className="btn-primary" type="submit">Register</button>
                    <div>
                        <p>Already have an account? <a href='/login'>Sign In</a></p>
                    </div>
                </form>
            </div>

        </div>
    );
};

export default Register;
