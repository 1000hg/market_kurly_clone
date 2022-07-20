const express = require('express');
const path = require('path');
const productViewController = require('../controller/product_view.js');

const router = express.Router();

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "../views/product_view.html"));
});

router.post('/create', productViewController.createProductView);

router.get('/findList'. productViewController.findProductViewList);

router.get('/findList'. productViewController.findProductViewCategory);

module.exports = router;