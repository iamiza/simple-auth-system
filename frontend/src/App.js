import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './pages/login';
import TaskList from './components/dashboard';
import CreateTask from './components/createTask';
import Register from './pages/register';
import WelcomePage from './pages/homepage';
import { ErrorProvider } from './context/ErrorContext';
import ProtectedRoute from './components/protectedRoutes';

function App() {
    return (
        <AuthProvider>
            <Router>
                <ErrorProvider>
                    <Routes>
                        <Route path="/login" element={<Login />} />

                        
                            <Route path="/tasks" element={<ProtectedRoute><TaskList /></ProtectedRoute>} />
                            <Route path="/create-tasks" element={<ProtectedRoute><CreateTask /></ProtectedRoute>} />
                        

                        <Route path="/" element={<WelcomePage />} />
                        <Route path="/register" element={<Register />}></Route>
                    </Routes>
                </ErrorProvider>
            </Router>
        </AuthProvider>
    );
}

export default App;
