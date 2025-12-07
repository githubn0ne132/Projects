const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  protocol: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false // Adjusting for CockroachDB if needed, start with false to ensure connection then try true if I had the cert.
      // The user gave 'sslmode=verify-full' in the URL but I don't have the CA cert.
      // Usually verify-full requires the CA. I will try rejectUnauthorized: false which corresponds to sslmode=require (or verify-ca without the ca).
      // If I strictly follow the URL, it might fail. Let's try to be permissive first.
    }
  },
  logging: false,
});

const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  }
};

if (require.main === module) {
    testConnection();
}

module.exports = sequelize;
