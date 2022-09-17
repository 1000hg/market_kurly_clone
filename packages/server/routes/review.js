const express = require('express');
const path = require('path');
const reviewController = require('../controller/review.js');

const router = express.Router();

router.post('/create', reviewController.createProduct);

router.post('/data', reviewController.findReview);

router.post('/list', reviewController.findReviewList);

module.exports = router;