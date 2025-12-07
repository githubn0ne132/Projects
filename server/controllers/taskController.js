const { Task, Project, User, Attachment } = require('../models');

exports.createTask = async (req, res) => {
  try {
    const { title, description, status, priority, deadline, project_id, assignee_id } = req.body;

    // Check if project exists
    const project = await Project.findByPk(project_id);
    if (!project) return res.status(404).json({ message: 'Project not found' });

    const task = await Task.create({
      title,
      description,
      status,
      priority,
      deadline,
      project_id,
      assignee_id,
    });

    // Notify assignee (Socket.io to be integrated)

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: 'Error creating task', error: error.message });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });

    await task.update(req.body);
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: 'Error updating task', error: error.message });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });

    await task.destroy();
    res.json({ message: 'Task deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting task', error: error.message });
  }
};

exports.getTaskById = async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id, {
        include: [
            { model: User, as: 'assignee', attributes: ['id', 'username'] },
            { model: Project, as: 'project', attributes: ['id', 'title'] },
            { model: Attachment, as: 'attachments', where: { parent_type: 'Task' }, required: false }
        ]
    });
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching task', error: error.message });
  }
};
