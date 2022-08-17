const db = require('../db');
const serviceStatus = require('../modules/serviceStatus')

async function createProduct(data) {

  try {
    const result = await db.query(
      `INSERT INTO tb_product SET
        category_seq=?,
        product_name=?,
        product_price=?,
        product_stock=?,
        product_origin=?,
        product_status=?,
        sales_unit=?,
        sales_weight=?,
        discount_price=?,
        discount_rate=?,
        is_discount=?,
        accumulate_price=?,
        accumulate_rate=?,
        is_accumulate=?,
        product_discount_price=?,
        is_coupon=?`,
        [
          data.category_seq,
          data.product_name,
          data.product_price,
          data.product_stock,
          data.product_origin,
          "1",
          data.sales_unit,
          data.sales_weight,
          data.discount_price,
          data.discount_rate,
          "1",
          data.accumulate_price,
          data.accumulate_rate,
          "1",
          Number(data.product_price) - Number(data.discount_price),
          data.is_coupon
        ]
      )

      data.img_data.forEach(e => {
        db.query(
          `INSERT INTO tb_product_img SET
            product_seq=?,
            product_img=?,
            create_dtm=?,
            update_dtm=?`,
            [
              result[0].insertId,
              e,
              new Date(),
              new Date()
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

  module.exports = {
    createProduct
  }