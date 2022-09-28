const express = require('express');
const path = require('path');
const qaController = require('../controller/qa.js');

const router = express.Router();

router.post('/create', qaController.createQa);

router.post('/data', qaController.findQa);

router.get('/list', qaController.findQaList);

module.exports = router;