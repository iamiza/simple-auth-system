import React from 'react';
import { BrowserRouter as Router, Route , Routes} from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './pages/login';
import TaskList from './components/dashboard';
import CreateTask from './components/createTask';
import Register from './pages/register';
import WelcomePage from './pages/homepage';

function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/login" element={<Login/>} />
                    <Route path="/tasks" element={<TaskList/>} />
                    <Route path="/create-tasks" element={<CreateTask/>} />
                    <Route path="/" element={<WelcomePage/>} />
                    <Route path="/register" element={<Register/>}></Route>
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;
