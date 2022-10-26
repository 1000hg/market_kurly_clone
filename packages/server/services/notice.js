const db = require('../db');
const serviceStatus = require('../modules/serviceStatus')

async function findNoticeList(page) {
    try {
        let [result] = await db.query(`SELECT * FROM tb_notice`);
    
        if(result) {
          serviceStatus.status = 200
          serviceStatus.msg = '공지 조회에 성공하였습니다.'
          serviceStatus.responseData = result
      } else {
          serviceStatus.staus = 400
          serviceStatus.msg = '공지 조회에 실패하였습니다.'
      }
    
      return serviceStatus;
      } catch(error) {
        console.error(error);
      }
}
  
module.exports = {
    findNoticeList
}