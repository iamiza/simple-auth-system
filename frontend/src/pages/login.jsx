import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {useError} from '../context/ErrorContext'

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();
    const { showError } = useError(); // Use the showError function from context

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/login', { email, password },
            {withCredentials:true});
            login(); 
            // Store token in httpOnly cookie
            navigate('/tasks')
        } catch (error) {
            if (error.response) {
                console.log('Login error:', error.response.data.message);
                showError(error.response.data.message);  // Show backend error message
            } else {
                console.log('Unexpected error:', error);
                showError('Something went wrong, please try again later.');
            }
            setEmail("");
            setPassword("");
        }
    };

    return (
        <div className="container">

            <div className="card">

                <h1>Login</h1>

                <form onSubmit={handleLogin}>

                    <div className="input">

                        <input className="input-field" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />



                        <input className="input-field" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />

                    </div>

                    <button className="btn-primary" type="submit">Login</button>

                    <div>

                        <p>Don't have an account? <a href='/register'>Sign Up</a></p>

                    </div>

                </form>

            </div>


        </div>
    );
};

export default Login;
