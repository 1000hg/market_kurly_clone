const db = require('../db');
const serviceStatus = require('../modules/serviceStatus')
const checkCategoryOrderCase = require('../modules/checkCategoryOrderCase')
const checkCategoryWhereCase = require('../modules/checkCategoryWhereCase')

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
        serviceStatus.status = 200
        serviceStatus.msg = '상품 생성에 성공하였습니다.'
    } else {
        serviceStatus.status = 400
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
        serviceStatus.status = 200
        serviceStatus.msg = '상품 조회에 성공하였습니다.'
        serviceStatus.responseData = result
    } else {
        serviceStatus.status = 400
        serviceStatus.msg = '상품 조회에 실패하였습니다.'
    }

    return serviceStatus;
    } catch(error) {
      console.error(error);
    }
}

async function findProductViewCategory(data) {
  try {
    
    let category_query = "";

    if (data.category_seq != undefined) {
      category_query = `and tb2.category_seq = '${data.category_seq}'`
    }

    if (data.page == undefined)
      data.page = 1;

    let orderCase = checkCategoryOrderCase(data.sort_type);
    let whereCase = checkCategoryWhereCase(data.brand);

    const [result] = await db.query(`SELECT * FROM tb_product_view as tb1 
    LEFT JOIN tb_product as tb2
    on tb1.product_seq = tb2.product_seq 
    where 1=1 ${category_query} and product_status = 1 and product_view_status = 1 ${whereCase}
    ${orderCase} LIMIT ${(data.page - 1) * 7}, 7`);

    if(result) {
      serviceStatus.status = 200
      serviceStatus.msg = '상품 조회에 성공하였습니다.'
      serviceStatus.responseData = result
  } else {
      serviceStatus.status = 400
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
    where UPPER(product_view_title) LIKE UPPER('%${product_name}%') and product_view_status = 1;`);

  if(result) {
    for (let i = 0; i < result.length; i++) {
            let [img] = await db.query(`SELECT product_img from tb_product_img where product_seq = ${result[i].product_seq}`);
            result[i].imgList = [img]
        }
      serviceStatus.status = 200
      serviceStatus.msg = '상품 조회에 성공하였습니다.'
      serviceStatus.responseData = result
  } else {
      serviceStatus.status = 400
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
      serviceStatus.status = 200
      serviceStatus.msg = '상품 조회에 성공하였습니다.'
      serviceStatus.responseData = result
  } else {
      serviceStatus.status = 400
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
    let query2 = ``;
    if (data.user_seq) {
      query = `, (SELECT count(*) from tb_wish_item as tb3 where product_view_seq = ${data.product_view_seq} and user_seq = ${data.user_seq}) as is_wish`
      query2 = `, (SELECT wish_item_seq from tb_wish_item as tb3 where product_view_seq = ${data.product_view_seq} and user_seq = ${data.user_seq} and is_delete = 1) as wish_item_seq`
      where = `and tb3.is_delete = 1`;
    }

    let [result] = await db.query(`SELECT *
    `+query+`
    `+query2+`
    FROM tb_product_view as tb1  
    LEFT JOIN tb_product as tb2 on tb1.product_seq = tb2.product_seq
    where tb1.product_view_seq = ${data.product_view_seq}`);

    if (result[0].is_wish == undefined)
      result[0].is_wish = 0;

      console.log(result);
    if(result) {
        let [img] = await db.query(`SELECT product_img from tb_product_img where product_seq = '${result[0].product_seq}'`);
        result[0].imgList = [img]

        
        let qa_count = await db.query(`SELECT count(*) as qa_count from tb_qa as tb4 where tb4.product_view_seq = '${data.product_view_seq}'`);
        result[0].qa_count = qa_count

        let review_count = await db.query(`SELECT count(*) as review_count from tb_review as tb4 where tb4.product_view_seq = '${data.product_view_seq}'`);
        result[0].review_count = review_count

        if (result[0].accumulate_price == "") {
          result[0].accumulate_price = 0;
        }

      serviceStatus.status = 200
      serviceStatus.msg = '상품 조회에 성공하였습니다.'
      serviceStatus.responseData = result
  } else {
      serviceStatus.status = 400
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