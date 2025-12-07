const express = require('express');
const router = express.Router();
const { createProject, getAllProjects, getProjectById, updateProject, deleteProject } = require('../controllers/projectController');
const { authMiddleware, roleMiddleware } = require('../middleware/authMiddleware');

router.post('/', authMiddleware, roleMiddleware(['Admin', 'Manager']), createProject);
router.get('/', authMiddleware, getAllProjects);
router.get('/:id', authMiddleware, getProjectById);
router.put('/:id', authMiddleware, roleMiddleware(['Admin', 'Manager']), updateProject);
router.delete('/:id', authMiddleware, roleMiddleware(['Admin']), deleteProject);

module.exports = router;
