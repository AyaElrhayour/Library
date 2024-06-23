'use strict';
const { Client } = require('pg');
const dbConn = new Client({
  host: 'localhost',
  user: 'postgres',
  password: 'password',
  database: 'library',
  port: 5432
});

dbConn.connect(err => {
  if (err) {
    console.error('Database connection error', err.stack);
  } else {
    console.log('Database Connected!');
  }
});

module.exports = dbConn;