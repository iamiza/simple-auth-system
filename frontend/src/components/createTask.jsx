import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './createTask.css'
import {useError} from '../context/ErrorContext'

const CreateTask = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const navigate = useNavigate();
    const { showError } = useError();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/tasks', { title, description }, {
                withCredentials: true,
            });
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
        }
    };

    return (
        <div className="create-task-container">
          <div className="create-task-wrapper">
           
    
            <div className="card">
                <h2 className="card-title">Create New Task</h2>
            
    
              <form onSubmit={handleSubmit}>
                <div className="card-content">    
                  <div className="form-group">
                    <label htmlFor="title">Task Title</label>
                    <input
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Enter task title"
                      className="input-field"
                      required
                    />
                  </div>
    
                  <div className="form-group">
                    <label htmlFor="description">Task Description</label>
                    <textarea
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Enter task description"
                      className="textarea-field"
                    />
                  </div>
                </div>
    
                <div className="card-footer">
                  <button
                    type="button"
                    className="btn cancel-btn"
                    onClick={() => navigate("/tasks")}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn submit-btn"
                  >
                    Create Task
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      );
};

export default CreateTask;
