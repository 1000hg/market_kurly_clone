const express = require("express");
const router = express.Router();
const isAuth = require("../common/auth.js");
const paymentController = require("../controller/payment");

router.post("/checkout", isAuth, paymentController.paymentCart);

router.get("/list", isAuth, paymentController.paymentList);

module.exports = router;
