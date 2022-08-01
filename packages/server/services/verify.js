const mysql2 = require('mysql2/promise');
const dotenv = require('dotenv');
dotenv.config();

const dbPool = mysql2.createPool({
  host: process.env.DB_HOST,
  //port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PW,
  database: 'market-kurly-clone',
  dateStrings : "date",
  connectionLimit: 10,
  waitForConnections: true,
});

// 회원 아이디 및 비빌번호 확인 인증
async function findByUser(user) {
  
  try {
    const result = await dbPool.query(
      `SELECT * 
      FROM tb_user 
      WHERE ${Object.keys(user)[0]} = "${Object.values(user)[0]}" 
      AND ${Object.keys(user)[1]} = "${Object.values(user)[1]}"`
    );
    // DB에서 가져온 회원데이터에 메시지 넣기
    if ( Object.keys(user)[0] == "user_name") {
      result[0][0].message = "아이디로 로그인하세요!";
      return result[0][0];
    } else {
      result[0][0].message = "새로운 비밀빈호를 입력하세요!";
      return result[0][0];
    }

  } catch(error) {
    console.error(error);
  }
}

module.exports = {
  findByUser,
}