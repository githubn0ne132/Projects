const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Attachment = sequelize.define('Attachment', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  file_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  file_path: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  original_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  mime_type: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  size: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  // Polymorphic association fields
  parent_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  parent_type: {
    type: DataTypes.STRING,
    validate: {
      isIn: [['Project', 'Task']],
    },
    allowNull: false,
  },
  uploaded_by: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id',
    },
  },
});

module.exports = Attachment;
