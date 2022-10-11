const express = require("express");
const router = express.Router();
const isAuth = require("../common/auth.js");
const cartController = require("../controller/cart.js");

router.post("/add", isAuth, cartController.addProductToCart);

router.get("/list", isAuth, cartController.getProductsToCart);

router.delete("/del", isAuth, cartController.deleteProductsToCart);

router.put("/update", isAuth, cartController.updateProductToCart);

router.get("/order", isAuth, cartController.orderProductsToCart);

module.exports = router;
