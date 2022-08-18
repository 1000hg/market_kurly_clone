const express = require('express');
const path = require('path');
const productViewController = require('../controller/product_view.js');

const router = express.Router();

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "../views/product_view.html"));
});

router.post('/create', productViewController.createProductView);

router.get('/list', productViewController.findProductViewList);

router.get('/findCategory', productViewController.findProductViewCategory);

router.get('/img', productViewController.findProductImg);


module.exports = router;