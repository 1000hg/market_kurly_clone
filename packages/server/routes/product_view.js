const express = require('express');
const path = require('path');
const productViewController = require('../controller/product_view.js');

const router = express.Router();

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "../views/product_view.html"));
});

router.post('/create', productViewController.createProductView);


/**
* @swagger
* paths:
*  /product/view/list:
*   get:
*     tags: [product_view_list]
*     summary: 상품뷰 리스트
*     responses:
*       "200":
*         description: 상품뷰 리스트 로드 성공
*     
*/
router.get('/list', productViewController.findProductViewList);

router.get('/findCategory', productViewController.findProductViewCategory);

/**
 * @swagger
 * /product/view/search?product_name={product_name}:
 *  get:
 *    summary: "상품뷰 검색"
 *    description: "파라미터값을 담아 보낸다."
 *    tags: [product_view_list]
 *    parameters:
 *      - in: query
 *        name: product_name
 *        required: true
 *        description: 상품명
 *        schema:
 *          type: string
 *    responses:
 *      "200":
 *        description: 상품명을 파라미터로 받아 서버로 전송하여 검색합니다.
 */
router.get('/search', productViewController.findProductViewName);

router.get('/img', productViewController.findProductImg);

/**
 * @swagger
 * /product/view/data/{product_view_seq}:
 *  get:
 *    summary: " 검색"
 *    description: "파라미터값을 담아 보낸다."
 *    tags: [product_view_list]
 *    parameters:
 *      - in: path
 *        name: product_view_seq
 *        required: true
 *        description: 상품뷰 seq
 *        schema:
 *          type: string
 *    responses:
 *      "200":
 *        description: 상품뷰 시퀀스를 받아 상세정보를 불러옵니다.
 */
router.get('/data/:product_view_seq', productViewController.findProductView);


module.exports = router;