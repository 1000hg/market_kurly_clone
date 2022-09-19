const express = require('express');
const path = require('path');
const couponViewController = require('../controller/coupon.js');
const isAuth = require('../common/auth.js');

const router = express.Router();

router.get('/list', isAuth, couponViewController.findCouponList);

router.get('/user/list', isAuth, couponViewController.findUserCouponList);

module.exports = router;