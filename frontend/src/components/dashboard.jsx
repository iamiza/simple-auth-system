import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

import './dashboard.css'
import { useError } from '../context/ErrorContext';

const TaskList = () => {
    const { user, logout } = useAuth();
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { showError } = useError();

    useEffect(() => {
        if (user) {
            axios.get('http://localhost:5000/tasks', {
                withCredentials: true,
            })
                .then(response => {
                    setTasks(response.data);
                    setLoading(false);
                })
                .catch(error => {
                    console.error('Error fetching tasks:', error);
                    setLoading(false);
                });
        } else {
            setLoading(false); // stop loading if no user
        }
    }, [user]);
    const handleDelete = async (taskId) => {
        try {
            await axios.delete(`http://localhost:5000/tasks/${taskId}`, {
                withCredentials: true,
            });
            // remove task from local state
            setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
        } catch (error) {
            if (error.response) {
                // If the error response exists, display the message sent from the backend
                showError(error.response.data.message);  // Show backend error message
            } else {
                console.log('Unexpected error:', error);
                showError('Something went wrong, please try again later.');
            }
        }
    };

    const handleLogout = async (e) => {
        try {
            logout(); // Store token in httpOnly cookie
            navigate("/")

        } catch (error) {
            if (error.response) {
                showError(error.response.data.message);  // Show backend error message
            } else {
                console.log('Unexpected error:', error);
                showError('Something went wrong, please try again later.');
            }
            navigate("/")
        }
    }


    return (
        <div>

            <div className="task-dashboard">
                <div className='logout'>
                    <button className="logout-button" onClick={() => handleLogout()}>Logout</button>
                </div>


                <div className="dashboard-container">
                    <h1 className="dashboard-title">Task Dashboard</h1>

                    {loading ? (
                        <p>Loading...</p>
                    ) : tasks.length === 0 ? (
                        <div className="empty-task-box">
                            <p className="empty-task-text">Your task list is empty. Time to add something new!</p>
                        </div>
                    ) : (
                        <div className="task-list">
                            {tasks.map((task) => (
                                <div key={task.id} className="task-item">
                                    <div className="task-item-content">
                                        <div className="task-icon"></div>
                                        <div className="task-info">
                                            <h3 className="task-title">{task.title}</h3>
                                            <p className="task-desc">{task.description}</p>
                                        </div>
                                        <button
                                            onClick={() => handleDelete(task.id)
                                            }
                                            className="delete-button"
                                        >
                                            Delete
                                        </button>

                                    </div>
                                    <hr className="task-separator" />
                                </div>
                            ))}
                        </div>
                    )}

                    <div className="add-button-container">
                        <Link to='/create-tasks'>
                            <button className="add-task-button">
                                Add New Task
                            </button>
                        </Link>



                    </div>

                </div>
            </div>

        </div>
    );
};

export default TaskList;
