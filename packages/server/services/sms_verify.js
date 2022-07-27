const mysql2 = require('mysql2/promise');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
dotenv.config();

const dbPool = mysql2.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PW,
  database: 'market-kurly-clone',
  dateStrings : "date",
  connectionLimit: 10,
  waitForConnections: true,
});

async function findById(name, phone) {
  console.log(name, phone);
  try {
    const result = await dbPool.query(`SELECT * FROM tb_user WHERE user_name = "${name}" AND user_phone = "${phone}"`);
    console.log('DB result : ', result[0][0])
    return result[0][0];
  } catch(error) {
    console.error(error);
  }
}

module.exports = {
  findById,
}