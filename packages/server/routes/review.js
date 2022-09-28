const express = require('express');
const path = require('path');
const reviewController = require('../controller/review.js');

const router = express.Router();

router.post('/create', reviewController.createReview);

router.post('/data', reviewController.findReview);

router.get('/list', reviewController.findReviewList);

module.exports = router;