const db = require('../db');
const serviceStatus = require('../modules/serviceStatus')

async function createProductView(data) {

  try {
    const result = await db.query(
      `INSERT INTO tb_product_view SET
        product_seq=?,
        product_view_title=?,
        vender=?,
        product_view_desc=?,
        packaging_type=?,
        packaging_type_detail=?,
        allergy_info=?,
        expiration_date=?,
        notification=?,
        view_count=?,
        dib_count=?,
        purchase_count=?,
        product_view_status=?,
        recommend_count=?,
        create_dtm=?,
        update_dtm=?`,
        [
          data.product_seq,
          data.product_view_title,
          data.vender,
          data.product_view_desc,
          data.packaging_type,
          data.packaging_type_detail,
          data.allergy_info,
          data.expiration_date,
          data.notification,
          "1",
          "1",
          "1",
          "1",
          "1",
          new Date(),
          new Date()
        ]
      )

    if(result) {
        serviceStatus.staus = 200
        serviceStatus.msg = '상품 생성에 성공하였습니다.'
    } else {
        serviceStatus.staus = 400
        serviceStatus.msg = '상품 생성에 실패하였습니다.'
    }

    return serviceStatus;
    } catch(error) {
      console.error(error);
    }
  }

async function findProductViewList() {
    try {

      let [result] = await db.query(`SELECT tb1.*, tb2.*
      FROM tb_product_view as tb1 
            LEFT JOIN tb_product as tb2 on tb1.product_seq = tb2.product_seq`);

      if(result) {
        for (let i = 0; i < result.length; i++) {
            let [img] = await db.query(`SELECT product_img from tb_product_img where product_seq = ${result[i].product_seq}`);
            result[i].imgList = [img]
        }
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

async function findProductViewCategory(category_seq) {
  try {
    const result = await db.query(`SELECT * FROM tb_product_view as tb1 
    LEFT JOIN tb_product as tb2
    on tb1.product_seq = tb2.product_seq where tb2.category_seq = '${category_seq}' and tb1.product_status = 1 and tb2.product_view_status = 1;`);

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

async function findProductViewName(product_name) {
  try {
    const [result]= await db.query(`SELECT * FROM tb_product_view  as tb1
    LEFT JOIN tb_product as tb2 on tb1.product_seq = tb2.product_seq
    where product_view_title LIKE '%${product_name}%' and product_view_status = 1;`);

  if(result) {
    for (let i = 0; i < result.length; i++) {
            let [img] = await db.query(`SELECT product_img from tb_product_img where product_seq = ${result[i].product_seq}`);
            result[i].imgList = [img]
        }
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


async function findProductImg() {
  try {
    const result = await db.query(`SELECT product_img FROM tb_product_img`);

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

async function findProductView(data) {
  try {
    let query = ``;
    if (data.user_seq) {
      query = `, (SELECT count(*) from tb_wish_item as tb3 where product_view_seq = ${data.product_view_seq} and user_seq = ${data.user_seq}) as is_wish`
    }

    let [result] = await db.query(`SELECT *
    `+query+`
    FROM tb_product_view as tb1  
    LEFT JOIN tb_product as tb2 on tb1.product_seq = tb2.product_seq
    where tb1.product_view_seq = ${data.product_view_seq}`);

    if(result) {
        let [img] = await db.query(`SELECT product_img from tb_product_img where product_seq = '${result[0].product_seq}'`);
        result[0].imgList = [img]

        
        let qa_count = await db.query(`SELECT count(*) as qa_count from tb_qa as tb4 where tb4.product_view_seq = '${data.product_view_seq}'`);
        result[0].qa_count = qa_count

        let review_count = await db.query(`SELECT count(*) as review_count from tb_review as tb4 where tb4.product_view_seq = '${data.product_view_seq}'`);
        result[0].review_count = review_count

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
  createProductView,
  findProductViewList,
  findProductViewCategory,
  findProductViewName,
  findProductImg,
  findProductView
}