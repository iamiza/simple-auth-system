import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {useError} from '../context/ErrorContext'
const apiURL = process.env.REACT_APP_API_URL

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, isAuthenticated } = useAuth(); // <- make sure isAuthenticated is exposed
    const navigate = useNavigate();
    const { showError } = useError();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${apiURL}/login`, { email, password }, {
                withCredentials: true
            });
            login(); // updates context
        } catch (error) {
            if (error.response) {
                showError(error.response.data.message);
            } else {
                showError('Something went wrong, please try again later.');
            }
            setEmail("");
            setPassword("");
        }
    };

    // React to successful login
    React.useEffect(() => {
        if (isAuthenticated) {
            navigate('/tasks');
        }
    }, [isAuthenticated, navigate]);

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
