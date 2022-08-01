const mysql2 = require('mysql2/promise');
const dotenv = require('dotenv');
dotenv.config();

const dbPool = mysql2.createPool({
  host: process.env.DB_HOST,
  // port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PW,
  database: 'market-kurly-clone',
  dateStrings : "date",
  connectionLimit: 10,
  waitForConnections: true,
});

async function resetPw(user) {
  console.log("user >> : ", user);
  try {
    const result = await dbPool.query(
      `UPDATE tb_user 
      SET user_password = "${user.user_password}" 
      WHERE user_id = "${user.user_id}"`        
      )
      // 수정한 정보반환
      return result[0].info;
  } catch(error) {
    console.error(error);
  }
}

module.exports = {
  resetPw,
}