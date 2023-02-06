const express = require('express');
const router = express.Router();
const authRouter = require('./auth');
const productRouter = require('./product');
const productViewRouter = require('./product_view');
const verifyRouter = require('./verify');
const usersRouter = require('./users');
const productWishRouter = require('./product_wish');
const categoryRouter = require('./category');
const couponRouter = require('./coupon');
const cartRouter = require('./cart');
const reviewRouter = require('./review');
const qaRouter = require('./qa');
const paymentRouter = require('./payment');
const noticeRouter = require('./notice');
const guestRouter = require('./guest');
const faqRouter = require('./faq');

// 회원가입 및 로그인 생성, 토큰발행
router.use('/auth', authRouter);
// id 및 비밀번호 찾기
router.use('/verify', verifyRouter);
// 회원 비밀번호 재설정
router.use('/user', usersRouter);

router.use('/product', productRouter);

router.use('/product/view', productViewRouter);

router.use('/product/wish', productWishRouter);

router.use('/category', categoryRouter);

router.use('/review', reviewRouter);

router.use('/qa', qaRouter);

router.use('/coupon', couponRouter);

router.use('/cart', cartRouter);

router.use('/payment', paymentRouter);

router.use('/notice', noticeRouter);

router.use('/guest', guestRouter);

router.use('/faq', faqRouter);


module.exports = router;
