const express = require('express');
const router = express.Router();
const { getAllUsers, updateUser, deleteUser } = require('../controllers/userController');
const { authMiddleware, roleMiddleware } = require('../middleware/authMiddleware');

router.get('/', authMiddleware, getAllUsers);
router.put('/:id', authMiddleware, roleMiddleware(['Admin']), updateUser);
router.delete('/:id', authMiddleware, roleMiddleware(['Admin']), deleteUser);

module.exports = router;
