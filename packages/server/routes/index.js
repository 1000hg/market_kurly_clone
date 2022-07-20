const express = require('express');
const router = express.Router();
const authRouter = require('./auth');
const productRouter = require('./product');
const productViewRouter = require('./product_view');


router.use("/auth", authRouter);

router.use("/product", productRouter);

router.use("/productView", productViewRouter);

module.exports = router;