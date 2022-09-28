const db = require('../db');
const serviceStatus = require('../modules/serviceStatus')

async function createQa(data) {
    try {
      const result = await db.query(
        `INSERT INTO tb_qa SET
            product_view_seq=?,
            title=?,
            content=?`
          [
            data.product_view_seq,
            data.title,
            data.content
          ]
        )
      
      if(result) {
          serviceStatus.staus = 200
          serviceStatus.msg = '상품 생성에 성공하였습니다.'
      } else {
          serviceStatus.staus = 400
          serviceStatus.msg = '상품 생성에 실패하였습니다.'
      }
  
      return result;
    } catch(error) {
        console.error(error);
    }
}

async function findQa(data) {
    try {
        let [result] = await db.query(`SELECT * FROM tb_qa
        where product_view_seq = ${data.product_view_seq}`);
    
        if(result) {
          serviceStatus.staus = 200
          serviceStatus.msg = '상품 조회에 성공하였습니다.'
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

async function findQaList(page) {
    try {
        let [result] = await db.query(`SELECT * FROM tb_qa order by create_dtm desc LIMIT ${(page - 1) * 7}, 7`);
    
        if(result) {
          serviceStatus.staus = 200
          serviceStatus.msg = '상품 조회에 성공하였습니다.'
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
    createQa,
    findQa,
    findQaList
}