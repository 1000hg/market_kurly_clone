const db = require('../db');
const fs = require("fs");
const serviceStatus = require('../modules/serviceStatus')

async function createProduct(data) {

  const fileCount = data.img_data.length; //넘어온 이미지 갯수
  const timeStamp = +new Date();
    
  for (let i = 0; i < fileCount; i++) {
      const imgPathTemp = process.env.DATA_PATH;
      let fileName = imgPathTemp + "_" + timeStamp + "_" + i + ".jpg";

      /*이미지 저장 */
      fs.writeFileSync(fileName, data.img_data[i].replace(/^data:image\/jpeg;base64,/, ""), "base64");


  }
  try {
    /*const result = await db.query(
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
        create_dtm=?,
        update_dtm=?`,
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
          new Date(),
          new Date()
        ]
      )*/

      const result = "123";
    
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