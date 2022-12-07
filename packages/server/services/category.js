const db = require('../db');
const serviceStatus = require('../modules/serviceStatus')

async function findCategoryList(data) {
    try {

      let result = "";
      if(data.type == "parent") {
        [result] = await db.query(`SELECT * FROM tb_category where is_use = 1 and parent_id = 0`);
      } else if (data.type == "child") {
        [result] = await db.query(`SELECT * FROM tb_category where is_use = 1 and parent_id != 0`);
      } else {
        [result] = await db.query(`SELECT * FROM tb_category where is_use = 1`);
      }

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

async function findCategoryChildData(data) {
  try {

    let [result] = await db.query(`SELECT * FROM tb_category where is_use = 1 and parent_id = ${data.categoryIdx}`);

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
    findCategoryList,
    findCategoryChildData
  }
