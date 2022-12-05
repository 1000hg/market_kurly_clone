const express = require('express');
const path = require('path');
const productController = require('../controller/product.js');

const router = express.Router();

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "../views/product.html"));
});

router.post('/create', productController.createProduct);

router.get('/createList', productController.createProductList);

router.get('/getProductBrand', productController.getProductBrand);

router.get('/getProductCategory', productController.getProductCategory);


module.exports = router;