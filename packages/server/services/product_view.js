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
      const result = await db.query(`SELECT * FROM tb_product_view where product_view_status = 1`);
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

async function findProductViewName(name) {
  try {
    const result = await db.query(`SELECT * FROM tb_product_view where product_view_title = '${name}' and product_view_status = 1;`);

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
  createProductView,
  findProductViewList,
  findProductViewCategory,
  findProductViewName
}