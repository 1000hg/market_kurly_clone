const db = require('../db');
const serviceStatus = require('../modules/serviceStatus')
const dataList = require('../modules/data')

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
        serviceStatus.status = 200
        serviceStatus.msg = '상품 생성에 성공하였습니다.'
    } else {
        serviceStatus.status = 400
        serviceStatus.msg = '상품 생성에 실패하였습니다.'
    }

    return result;
    } catch(error) {
      console.error(error);
    }
  }

  function createProductList() {
    const promiseFunction = () => {
        new Promise((resolve) => {
          setTimeout(() => resolve("result"), 1000)
        })
      };

    (async () => {
        for (let element of dataList) {
            const result = await promiseFunction();
            try {
              let is_discount = 0;
              if (element.discount_rate != 0) {
                is_discount = 1;
              }

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
                    24,
                    element.name,
                    element.sales_price,
                    "100",
                    "대한민국",
                    "1",
                    "1개",
                    "3개입",
                    Number(element.discounted_price),
                    element.discount_rate,
                    is_discount,
                    Number(element.discounted_price),
                    element.discount_rate,
                    is_discount,
                    Number(element.sales_price) - Number(element.discounted_price),
                    "0"
                  ]
                )

                db.query(
                  `INSERT INTO tb_product_img SET
                    product_seq=?,
                    product_img=?,
                    create_dtm=?,
                    update_dtm=?`,
                    [
                      result[0].insertId,
                      element.list_image_url,
                      new Date(),
                      new Date()
                    ]
                )
      
                
      
                db.query(
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
                      result[0].insertId,
                      element.name,
                      "컬리",
                      element.short_description,
                      "냉장 (종이포장)",
                      "택배배송은 에코 포장이 스티로품으로 대체됩니다.",
                      "없음",
                      "해당상품은 신선식품으로 별도의 유통기간이 없으나 가급적 빠르게 섭취해주시기 바랍니다.",
                      "식품 특성상 중량은 3% 내외의 차이가 발생할 수 있습니다.",
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
          
              } catch(error) {
                console.error(error);
              }
        }
    })();

  }

  async function getProductBrand(data) {
    try {
      const [result] = await db.query(`SELECT vender as brand, count(vender) as brand_cnt FROM tb_product_view as tb1 LEFT JOIN tb_product as tb2
      on tb1.product_seq = tb2.product_seq 
      where tb2.category_seq = '${data.category_seq}' group by vender`);
  
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

  async function getProductCategory(data) {
    try {
      const [result] = await db.query(`SELECT count(product_seq) as category_cnt, tb2.category_name FROM tb_product as tb1
      Left join tb_category as tb2 on tb1.category_seq = tb2.category_seq
      group by tb1.category_seq`);
  
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

  module.exports = {
    createProduct,
    createProductList,
    getProductBrand,
    getProductCategory
  }