
const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
dotenv.config();

const pool = mysql.createPool({
  host: process.env.host,
  user: process.env.user,
  password: process.env.password,
  database: process.env.database,
  waitForConnections: true,
});

pool.getConnection()
  .then(conn => {
    console.log(' MySQL connected');
    conn.release();
  })
  .catch(err => {
    console.error(' MySQL connection failed:', err.message);
  });

module.exports = pool;