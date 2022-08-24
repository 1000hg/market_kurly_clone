const express = require('express');
const path = require('path');
const couponViewController = require('../controller/coupon.js');

const router = express.Router();

router.get('/list', couponViewController.findCouponList);

module.exports = router;