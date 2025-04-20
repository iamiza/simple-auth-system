import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
const apiURL = process.env.REACT_APP_API_URL

const WelcomePage = ()=> {
  console.log("url",apiURL);
  return (
    <div className="container">
      <div className="card">
        <div className="header">
          <h1>Welcome to Task Manager</h1>
          <p>Get started with managing your tasks</p>
        </div>
        <div className="buttons">
          <Link to="/login">
            <button className="btn-primary">Login</button>
          </Link>
          <Link to="/register">
            <button className="btn-outline">Register</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default WelcomePage;
