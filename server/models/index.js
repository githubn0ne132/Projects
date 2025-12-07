const sequelize = require('../config/database');
const User = require('./User');
const Project = require('./Project');
const Task = require('./Task');
const Attachment = require('./Attachment');

// User Relationships
User.hasMany(Project, { foreignKey: 'created_by', as: 'createdProjects' });
Project.belongsTo(User, { foreignKey: 'created_by', as: 'creator' });

User.hasMany(Task, { foreignKey: 'assignee_id', as: 'assignedTasks' });
Task.belongsTo(User, { foreignKey: 'assignee_id', as: 'assignee' }); // I missed adding assignee_id in Task model definition, need to add it or let Sequelize add it, but better explicit.

User.hasMany(Attachment, { foreignKey: 'uploaded_by', as: 'uploads' });
Attachment.belongsTo(User, { foreignKey: 'uploaded_by', as: 'uploader' });

// Project Relationships
Project.hasMany(Task, { foreignKey: 'project_id', as: 'tasks', onDelete: 'CASCADE' });
Task.belongsTo(Project, { foreignKey: 'project_id', as: 'project' });

// Polymorphic Attachment Relationships
// Since Sequelize doesn't support polymorphic associations natively as easily as Rails, we handle query logic manually or use hooks,
// but for standard foreign keys we can just query by parent_id + parent_type.
// Or we can define 'hasMany' on Project and Task with scope.

Project.hasMany(Attachment, {
  foreignKey: 'parent_id',
  constraints: false,
  scope: {
    parent_type: 'Project'
  },
  as: 'attachments'
});

Task.hasMany(Attachment, {
    foreignKey: 'parent_id',
    constraints: false,
    scope: {
      parent_type: 'Task'
    },
    as: 'attachments'
});

Attachment.belongsTo(Project, { foreignKey: 'parent_id', constraints: false });
Attachment.belongsTo(Task, { foreignKey: 'parent_id', constraints: false });

module.exports = {
  sequelize,
  User,
  Project,
  Task,
  Attachment,
};
