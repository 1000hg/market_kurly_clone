const db = require('../db');
const serviceStatus = require('../modules/serviceStatus')

async function findFaqTypeList() {
    try {
        let [result] = await db.query(`SELECT * FROM tb_faq_type`);
    
        if(result) {
          serviceStatus.staus = 200
          serviceStatus.msg = '조회에 성공하였습니다.'
          serviceStatus.responseData = result
      } else {
          serviceStatus.staus = 400
          serviceStatus.msg = '조회에 실패하였습니다.'
      }
    
      return serviceStatus;
      } catch(error) {
        console.error(error);
      }
}


async function createFaq(data) {

    try {
        const result = await db.query(
            `INSERT INTO tb_faq SET
                user_seq=?,
                type1_seq=?,
                type2_seq=?,
                type1_content=?,
                type2_content=?,
                title=?,
                content=?`,
                [
                    data.user_seq,
                    data.type1_seq,
                    data.type2_seq,
                    data.type1_content,
                    data.type2_content,
                    data.title,
                    data.content
                ]
        )
  
        data.img_data.forEach(e => {
          db.query(
            `INSERT INTO tb_faq_img SET
              faq_seq=?,
              faq_img=?`,
              [
                result[0].insertId,
                e,
              ]
          )
        })
      
        if(result) {
            serviceStatus.status = 200
            serviceStatus.msg = '생성에 성공하였습니다.'
        } else {
            serviceStatus.status = 400
            serviceStatus.msg = '생성에 실패하였습니다.'
        }
    
        return result;
    } catch(error) {
        console.error(error);
    }
}

async function findFaqList(data) {
    try {

      let [result] = await db.query(`SELECT *
        FROM tb_faq where user_seq = ${data.user_seq}`);

      if(result) {
        for (let i = 0; i < result.length; i++) {
            let [img] = await db.query(`SELECT faq_img from tb_faq_img where faq_seq = ${result[i].faq_seq}`);
            result[i].imgList = [img]
        }
        serviceStatus.status = 200
        serviceStatus.msg = '조회에 성공하였습니다.'
        serviceStatus.responseData = result
    } else {
        serviceStatus.status = 400
        serviceStatus.msg = '조회에 실패하였습니다.'
    }

    return serviceStatus;
    } catch(error) {
      console.error(error);
    }
}


module.exports = {
    findFaqTypeList,
    createFaq,
    findFaqList
}