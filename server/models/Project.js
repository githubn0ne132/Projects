const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Project = sequelize.define('Project', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT, // Rich text support (stores HTML or Markdown)
    allowNull: true,
  },
  status: {
    type: DataTypes.STRING,
    validate: {
      isIn: [['Active', 'Completed', 'Archived']],
    },
    defaultValue: 'Active',
  },
  created_by: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id',
    },
  },
});

module.exports = Project;
