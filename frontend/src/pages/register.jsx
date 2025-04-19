import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleRegistration = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/register', {username, email, password });
            login(response.data.token); // Store token in httpOnly cookie
            navigate('/tasks');
        } catch (error) {
            console.error('Registration error:', error);
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
