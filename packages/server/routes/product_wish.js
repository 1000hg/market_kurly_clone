const express = require("express");
const router = express.Router();
const productWishController = require("../controller/product_wish.js");

router.get("/list", productWishController.getWishList);

router.post("/add", productWishController.addWishProduct);

router.delete("/del/:seq", productWishController.delWishProduct);

module.exports = router;
