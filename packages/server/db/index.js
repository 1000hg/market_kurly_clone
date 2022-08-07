const dotenv = require('dotenv');
dotenv.config();

const mysql2 = require('mysql2/promise');

const config = {
    host: process.env.DB_HOST,
    // port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PW,
    database: 'market-kurly-clone',
    dateStrings : "date",
    connectionLimit: 10,
    waitForConnections: true,
}
  

module.exports = mysql2.createPool(config);
  