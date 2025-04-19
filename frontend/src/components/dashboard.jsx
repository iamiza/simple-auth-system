import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Link , useNavigate} from 'react-router-dom';

import './dashboard.css'

const TaskList = () => {
    const { user, logout } = useAuth();
    const [tasks, setTasks] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        if (user) {
            axios.get('http://localhost:5000/tasks', {
                withCredentials: true,
            })
                .then(response => {
                    setTasks(response.data);
                })
                .catch(error => {
                    console.error('Error fetching tasks:', error);
                });
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
            console.error("Error deleting task:", error);
        }
    };

    const handleLogout = async (e) => {
        try {
            logout(); // Store token in httpOnly cookie
            navigate("/")

        } catch (error) {
            console.error('Logout error:', error);
        }
    }


    return (
        <div>

            <div className="task-dashboard">
                <div className='logout'>
                    <button className="logout-button" onClick={()=> handleLogout()}>Logout</button>
                </div>
            

                <div className="dashboard-container">
                    <h1 className="dashboard-title">Task Dashboard</h1>

                    {tasks.length === 0 ? (
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
                        {/* <div>
                        {
                            user ? (
                                <>

                                    <button className="add-task-button" onClick={logout}>Logout</button>
                                </>
                            ) : (<Link to="/"></Link>)
                        }
                    </div> */}


                    </div>
                   
                </div>
            </div>

        </div>
    );
};

export default TaskList;
