const express = require('express');
const path = require('path');
const noticeController = require('../controller/notice.js');

const router = express.Router();

/**
 * @swagger
 * /notice/list:
 *  get:
 *    summary: "상품뷰 검색"
 *    description: "파라미터값을 담아 보낸다."
 *    tags: [Notice]
 *    responses:
 *      "200":
 *        description: 페이지를 받아 qa 리스트를 출력합니다.
 */
router.get('/list', noticeController.findNoticeList);

module.exports = router;