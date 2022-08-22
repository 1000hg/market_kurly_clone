const db = require('../db');
const serviceStatus = require('../modules/serviceStatus')

async function findCategoryList() {
    try {

      let [result] = await db.query(`SELECT * FROM tb_category where is_use = 1`);

      if(result) {
        serviceStatus.staus = 200
        serviceStatus.msg = '카테고리 조회에 성공하였습니다.'
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
    findCategoryList
  }
