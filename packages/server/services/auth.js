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

// 회원가입시 기존 아이디가 있는지 확인
async function findByUser(user_id) {
  
  try {
    const result = await dbPool.query(`SELECT * FROM tb_user WHERE user_id = "${user_id}"`);
    return result[0][0];
  } catch(error) {
    console.error(error);
  }
}

// 추천인이 있을 경우 추천인수 증가
async function addRefferCount(user_id) {
  console.log("reffer_id : ", user_id);
  try {
    let result = await dbPool.query(`SELECT reffer_count FROM tb_user WHERE user_id = "${user_id}"`);
    result = Number(result[0][0].reffer_count) + 1;
    dbPool.query(`UPDATE tb_user SET reffer_count="${result}" WHERE user_id = "${user_id}"`)
  } catch(error) {
    console.error("addreffer_id : ", error)
  }
}

async function findByUserSeq(user_seq) {
  try {
    const result = await dbPool.query(`SELECT * FROM tb_user WHERE user_seq = "${user_seq}"`);
    return result[0][0];
  } catch(error) {
    console.error(error)
  }
}

// DB에 회원가입 데이터 저장
async function createUser(user) {
  console.log("user >> : ", user);
  try {
    const result = await dbPool.query(
      `INSERT INTO tb_user SET
        user_id=?,
        user_password=?,
        user_name=?,
        user_email=?,
        user_phone=?,
        user_birth=?,
        gender=?,
        reffer_id=?,
        join_event_name=?,
        create_dtm=?,
        update_dtm=?`,
        [
          user.user_id,
          user.user_password,
          user.user_name,
          user.user_email,
          user.user_phone,
          user.user_birth,
          user.gender,
          user.reffer_id,
          user.join_event_name,
          new Date(),
          new Date()
        ]
      )
      
      const resultAddress = await dbPool.query(
        `INSERT INTO tb_user_address SET
          user_seq=?,
          zip_code=?,
          address=?,
          address_detail=?,
          create_dtm=?,
          update_dtm=?`,
          [
            result[0].insertId,
            user.zip_code,
            user.address,
            user.address_detail,
            new Date(),
            new Date()
          ]
      )
      // 저장한 user_seq 반환
      return result[0].insertId;
  } catch(error) {
    console.error(error);
  }
}

module.exports = {
  findByUser,
  createUser,
  addRefferCount,
  findByUserSeq
}