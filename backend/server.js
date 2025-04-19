const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
dotenv.config();

const db = require('./models'); // Sequelize setup from models/index.js
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");

const app = express();

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());
app.use(cookieParser());

//Routes
app.use(authRoutes);
app.use(taskRoutes);

// Optional test route
app.get('/', (req, res) => {
  res.send('API is running');
});

// Connect to DB and start server
const PORT = process.env.PORT || 5000;

db.sequelize.authenticate()
  .then(() => {
    console.log('Database connection established successfully');
    return db.sequelize.sync(); // Ensure tables exist
  })
  .then(() => {
    console.log('Tables synced');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err.message);
  });
