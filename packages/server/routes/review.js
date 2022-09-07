const express = require('express');
const path = require('path');
const reviewController = require('../controller/review.js');

const router = express.Router();

router.post('/create', reviewController.createProduct);

router.post('/data', reviewController.createProduct);

module.exports = router;