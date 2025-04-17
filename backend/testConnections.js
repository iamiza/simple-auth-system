// backend/testConnection.js
const test = require('./config/db');

async function testConnection() {
  try {
    await test.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error.message);
  }
}

testConnection();
