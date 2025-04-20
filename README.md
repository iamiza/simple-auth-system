# Simple Authentication System

This is a full-stack application that provides a simple authentication system and task manager.  
The backend is built using **Node.js** and **Express**, while the frontend is built using **React**.  
The application allows users to register, log in, verify their authentication status, and access protected routes.

##  Features

- User registration, login, and logout
- Protected routes that require authentication
- Token-based authentication using **JWT**
- Frontend validation and error handling
- Uses `httpOnly` cookies for secure token storage
- View, create and delete the task 

## Tech Stack

### Backend
- Node.js
- Express.js
- Sequelize ORM
- MySQL 
- JWT (JSON Web Tokens)
- CORS for cross-origin support

### Frontend
- React.js
- React Router DOM
- Axios

---

##  Setup and Installation

### Backend Setup

1. Clone the backend repository:
   ```bash
   git clone git@github.com:iamiza/simple-auth-system.git
   cd simple-auth-system/backend

2. Install dependencies:
   ```bash
   npm install

3. Create a .env file in the backend folder and add the following environment variables:
    ```bash
    PORT=<your_port>
    JWT_SECRET=<your_jwt_secret_key>
    DB_HOST=<your_database_host>
    DB_USER=<your_db_user>
    DB_PASSWORD=<your_db_password>
    DB_NAME=<your_db_name>


4. Run the Server:
   ```bash
   npx nodemon server.js 

### Frontend Setup

1. Clone the backend repository:
   ```bash
   cd simple-auth-system/frontend

2. Install dependencies:
   ```bash
   npm install

3. Create a .env file in the frontend folder and add the following environment variables:
    ```bash
    REACT_APP_API_URL=http://localhost:5000


4. Start the frontend:
   ```bash
   npm start

## Usage

### Login

- Open the frontend application in your browser (`http://localhost:3000`).
- Navigate to the login page and enter valid credentials.

### Access Protected Routes

- Once logged in, the user can access protected routes that require authentication (e.g., Dashboard).
- If the user is not logged in, they will be redirected to the login page.

### Logout

- The user can log out by clicking the logout button, which will clear the session and invalidate the JWT token.

### Task Manager

- After logging in, users are redirected to the Task Manager.
- Users can create, view, and delete tasks.
- Each task is associated with the authenticated user and stored securely in the backend database.
