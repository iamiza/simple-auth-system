const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const { authToken } = require('../middleware/authenticateToken');

router.get('/tasks', authToken, taskController.getTasks);
router.post('/tasks', authToken, taskController.createTask);
router.delete('/tasks/:id', authToken, taskController.deleteTask);

module.exports = router;
