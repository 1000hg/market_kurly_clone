const db = require('../db');
const serviceStatus = require('../modules/serviceStatus')

async function findCouponList() {
    try {
      let [result] = await db.query(`SELECT * FROM tb_coupon`);

      if(result) {
        serviceStatus.staus = 200
        serviceStatus.msg = '쿠폰 조회에 성공하였습니다.'
        serviceStatus.responseData = result
      } else {
          serviceStatus.staus = 400
          serviceStatus.msg = '상품 조회에 실패하였습니다.'
      }

      return serviceStatus;
    } catch(error) {
      console.error(error);
    }
}

async function findUserCouponList(user_seq) {
  try {
    let [result] = await db.query(`SELECT * FROM tb_user_coupon where user_seq = ${user_seq}`);

    if(result) {
      serviceStatus.staus = 200
      serviceStatus.msg = '쿠폰 조회에 성공하였습니다.'
      serviceStatus.responseData = result
    } else {
        serviceStatus.staus = 400
        serviceStatus.msg = '상품 조회에 실패하였습니다.'
    }

    return serviceStatus;
  } catch(error) {
    console.error(error);
  }
}

module.exports = {
    findCouponList,
    findUserCouponList
}
