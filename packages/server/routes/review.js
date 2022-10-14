const express = require('express');
const path = require('path');
const reviewController = require('../controller/review.js');

const router = express.Router();

router.post('/create', reviewController.createReview);

/**
 * @swagger
 * definitions:
 *   ReviewData:
 *     type: "object"
 *     properties:
 *       product_view_seq:
 *         type: "string"
 *       page:
 *         type: "integer"
 *         format: "int64"
*/

/**
 * @swagger
 * /review/data:
 *   post:
 *     description: 상품뷰 세부 리뷰 리스트
 *     tags: [Review]
 *     produces:
 *     - "application/json"
 *     parameters:
 *     - name: "product_view_seq"
 *       in: "body"
 *       required: true
 *       schema:
 *         $ref: "#/definitions/ReviewData"
 *     responses:
 *       "200":
 *         description: "상품뷰 세부 리뷰 리스트를 출력합니다."
 *     
*/
router.post('/data', reviewController.findReview);


/**
 * @swagger
 * /review/list?page={page}:
 *  get:
 *    summary: "상품뷰 검색"
 *    description: "파라미터값을 담아 보낸다."
 *    tags: [Review]
 *    parameters:
 *      - in: query
 *        name: page
 *        required: true
 *        description: 페이지
 *        schema:
 *          type: string
 *    responses:
 *      "200":
 *        description: 페이지를 받아 리뷰 리스트를 출력합니다.
 */
router.get('/list', reviewController.findReviewList);

module.exports = router;