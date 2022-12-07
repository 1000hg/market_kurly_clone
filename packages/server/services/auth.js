const dbPool = require("../db");
const servicesCart = require("../services/cart");

async function userInfo(user_id) {
  try {
    const [result] = await dbPool.query(
      `SELECT 
        tb1.user_seq, tb1.user_id, tb1.user_password, tb1.user_name, tb1.user_phone,
        tb1.user_email, tb2.user_address_seq, tb2.address, tb2.address_detail, tb3.cart_seq
      FROM tb_user tb1
      INNER JOIN tb_user_address tb2
      ON tb1.user_seq = tb2.user_seq 
      LEFT JOIN tb_cart_detail tb3
      ON tb2.user_seq = tb3.user_seq
      WHERE tb1.user_id = "${user_id}"
      AND tb2.default_address = 1`
    );
    return result[0];
  } catch (e) {
    console.error(e);
  }
}

async function countItemInCart(user_seq) {
  try {
    const [resultCount] = await dbPool.query(
      `SELECT 
        COUNT(tb1.cart_seq) AS cart_count
      FROM tb_cart_detail tb1
      INNER JOIN tb_cart tb2
      ON tb2.cart_seq = tb1.cart_seq
      WHERE tb1.is_delete = "1"
      AND tb1.user_seq = ${user_seq}
      AND tb2.status = "0"`
    );
    return resultCount[0];
  } catch (e) {
    console.error(e);
  }
}

// 회원가입시 기존 아이디가 있는지 확인
async function findByUser(user_id, guest_cart) {
  
  try {
    const result = await userInfo(user_id);
    const addGuestCart = await servicesCart.addToCart({
      user_seq: result.user_seq,
      cart_seq: result.cart_seq,
      guest_cart,
    });
    const resultCount = await countItemInCart(result.user_seq);
    return { ...result, ...resultCount };
  } catch (error) {
    console.error(error);
  }
}

// 추천인이 있을 경우 추천인수 증가
async function addRefferCount(user_id) {
  
  try {
    let result = await dbPool.query(`SELECT reffer_count FROM tb_user WHERE user_id = "${user_id}"`);
    result = Number(result[0][0].reffer_count) + 1;
    dbPool.query(`UPDATE tb_user SET reffer_count="${result}" WHERE user_id = "${user_id}"`)
  } catch(error) {
    console.error("addReffer_id : ", error)
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
      default_address=?,
      create_dtm=?,
      update_dtm=?`,
    [
      result[0].insertId,
      user.zip_code,
      user.address,
      user.address_detail,
      1,
      new Date(),
      new Date(),
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