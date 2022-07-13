const db = require('../db');
const serviceStatus = require('../modules/serviceStatus')

async function createProduct(data) {
  try {
    const result = await db.query(
      `INSERT INTO tb_product SET
        category_seq=?,
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
        create_dtm=?,
        update_dtm=?`,
        [
          data.category_seq,
          data.product_price,
          data.product_stock,
          data.product_origin,
          data.product_status,
          data.sales_unit,
          data.sales_weight,
          data.discount_price,
          data.discount_rate,
          data.is_discount,
          data.accumulate_price,
          data.accumulate_rate,
          data.is_accumulate,
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

    return result;
    } catch(error) {
      console.error(error);
    }
  }

  module.exports = {
    createProduct
  }