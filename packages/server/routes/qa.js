const express = require('express');
const path = require('path');
const qaController = require('../controller/qa.js');

const router = express.Router();

router.post('/create', qaController.createQa);


/*
 *       description:
 *         type: "string"
 *       writer:
 *         type: "string"
 *       category:
 *         type: "string"
 *       price:
 *         type: "integer"
 *         format: "int64"
 *       state:
 *         type: "integer"
 *         format: "int64"
 *       images:
 *         type: "array"
 *         items:
 *           type: "string"
*/

/**
 * @swagger
 * tags:
 *   name: QAData
 *   description: 상품뷰 세부 QA 처리
 * definitions:
 *   QAData:
 *     type: "object"
 *     properties:
 *       product_view_seq:
 *         type: "string"
*/

/**
 * @swagger
 * /qa/data:
 *   post:
 *     description: 상품뷰 세부 QA 리스트
 *     tags: [QA]
 *     produces:
 *     - "application/json"
 *     parameters:
 *     - name: "product_view_seq"
 *       in: "body"
 *       required: true
 *       schema:
 *         $ref: "#/definitions/QAData"
 *     responses:
 *       "200":
 *         description: "상품뷰 세부 QA 리스트를 출력합니다."
 *     
*/
router.post('/data', qaController.findQa);


/**
 * @swagger
 * /qa/list?page={page}:
 *  get:
 *    summary: "상품뷰 검색"
 *    description: "파라미터값을 담아 보낸다."
 *    tags: [QA]
 *    parameters:
 *      - in: query
 *        name: page
 *        required: true
 *        description: 페이지
 *        schema:
 *          type: string
 *    responses:
 *      "200":
 *        description: 페이지를 받아 qa 리스트를 출력합니다.
 */
router.get('/list', qaController.findQaList);

module.exports = router;