import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './createTask.css'

const CreateTask = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/tasks', { title, description }, {
                withCredentials: true,
            });
            navigate('/tasks');
        } catch (error) {
            console.error('Error creating task:', error);
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
