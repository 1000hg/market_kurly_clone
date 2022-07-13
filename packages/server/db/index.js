const dotenv = require('dotenv');
dotenv.config();

const config = require('../config/config');
const mysql2 = require('mysql2/promise');

module.exports = dbPool = mysql2.createPool(config);
  