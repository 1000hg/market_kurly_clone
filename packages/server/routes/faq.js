const express = require('express');
const path = require('path');
const faqController = require('../controller/faq.js');

const router = express.Router();

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "../views/faq.html"));
});

router.get('/findFaqTypeList', faqController.findFaqTypeList);

router.post('/createFaq', faqController.createFaq);

router.get('/findFaqList', faqController.findFaqList);

module.exports = router;