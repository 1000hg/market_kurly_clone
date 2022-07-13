const dotenv = require('dotenv');
dotenv.config();

const config = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PW,
    database: 'market-kurly-clone',
    dateStrings : "date",
    connectionLimit: 10,
    waitForConnections: true
}

module.exports = config;