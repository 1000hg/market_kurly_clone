const db = require('../db');
const serviceStatus = require('../modules/serviceStatus')

async function createReview(data) {
    try {
      const result = await db.query(
        `INSERT INTO tb_review SET
            user_seq=?,
            product_view_seq=?,
            title=?,
            content=?`
          [
            data.user_seq,
            data.product_view_seq,
            data.title,
            data.content
          ]
        )
  
        data.img_data.forEach(e => {
          db.query(
            `INSERT INTO tb_review_img SET
                review_seq=?,
                review_img=?`,
                [
                    result[0].insertId,
                    e
                ]
          )
        })
      
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

async function findReview(data) {
    try {
        let [result] = await db.query(`SELECT * FROM tb_review
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

async function findReviewList(data) {
    try {
        let [result] = await db.query(`SELECT * FROM tb_review`);
    
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
    createReview,
    findReview,
    findReviewList
}