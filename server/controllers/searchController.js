const { Project, Task } = require('../models');
const { Op } = require('sequelize');

exports.search = async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) return res.json([]);

    // Full text search in Projects and Tasks
    // We can use Op.iLike for simpler partial match for now as CockroachDB supports it.

    const projects = await Project.findAll({
      where: {
        [Op.or]: [
          { title: { [Op.iLike]: `%${q}%` } },
          { description: { [Op.iLike]: `%${q}%` } },
        ]
      }
    });

    const tasks = await Task.findAll({
      where: {
        [Op.or]: [
          { title: { [Op.iLike]: `%${q}%` } },
          { description: { [Op.iLike]: `%${q}%` } },
        ]
      },
      include: [{ model: Project, as: 'project', attributes: ['title'] }]
    });

    res.json({ projects, tasks });
  } catch (error) {
    res.status(500).json({ message: 'Error searching', error: error.message });
  }
};
