const express = require("express");
const router = express.Router();
const productWishController = require("../controller/product_wish.js");
const isAuth = require('../common/auth.js');

router.get("/list", isAuth, productWishController.getWishList);

router.post("/add", isAuth, productWishController.addWishProduct);

router.delete("/del/:seq", isAuth, productWishController.delWishProduct);

module.exports = router;
