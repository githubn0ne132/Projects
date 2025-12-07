const express = require('express');
const router = express.Router();
const { createTask, updateTask, deleteTask, getTaskById } = require('../controllers/taskController');
const { authMiddleware, roleMiddleware } = require('../middleware/authMiddleware');

router.post('/', authMiddleware, roleMiddleware(['Admin', 'Manager']), createTask);
router.put('/:id', authMiddleware, updateTask); // Contributors can update status/progress
router.delete('/:id', authMiddleware, roleMiddleware(['Admin', 'Manager']), deleteTask);
router.get('/:id', authMiddleware, getTaskById);

module.exports = router;
