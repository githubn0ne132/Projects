const { sequelize } = require('./models');

const syncDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected...');

    // Sync all models. { alter: true } checks current state and updates it.
    await sequelize.sync({ alter: true });

    console.log('All models were synchronized successfully.');
    process.exit(0);
  } catch (error) {
    console.error('Unable to synchronize the database:', error);
    process.exit(1);
  }
};

syncDB();
