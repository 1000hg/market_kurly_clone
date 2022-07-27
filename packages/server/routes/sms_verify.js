const express = require('express');
const router = express.Router();
const smsController = require('../controller/sms_verify.js');

router.post('/verify', smsController.serchPhoneNumber);

module.exports = router;