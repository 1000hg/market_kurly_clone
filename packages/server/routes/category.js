const express = require('express');
const path = require('path');
const categoryViewController = require('../controller/category.js');

const router = express.Router();

router.get('/list', categoryViewController.findCategoryList);

module.exports = router;