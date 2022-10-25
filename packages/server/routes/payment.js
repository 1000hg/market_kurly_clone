const express = require("express");
const router = express.Router();
const isAuth = require("../common/auth.js");
const paymentController = require("../controller/payment");

router.post("/checkout", isAuth, paymentController.paymentCart);

router.get("/list", isAuth, paymentController.paymentList);

router.get("/detail", isAuth, paymentController.paymentDetail);

router.post("/reorder", isAuth, paymentController.reorder);

module.exports = router;
