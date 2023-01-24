const { Sequelize } = require('sequelize');
const express = require('express')
const app = express()
const port = 3000;
const { createDatabase } = require('./database/createDb');

// Top level await
(async () => {
  createDatabase();
  await testDatabase();
})();

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

async function testDatabase() {
  const sequelize = new Sequelize('postgres://postgres:supersecretpassword@localhost:5432/fsa') // Example for postgres

  // Test authentication
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

}