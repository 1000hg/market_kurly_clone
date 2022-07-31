const express = require('express');
const router = express.Router();
const smsController = require('../controller/sms_verify.js');
const emailController = require('../controller/email_verify.js');

// 아이디 및 비밀번호 확인위한 인증코드 발송요청
router.post('/sms', smsController.smsSend);
// 아이디 및 비밀번호 인증코드 확인
router.post('/sms/id', smsController.smsVerify)
router.post('/sms/pw', smsController.smsVerify)

router.post('/email', emailController.sendId);
router.post('/email/id', emailController.sendEmail);
router.post('/email/pw', emailController.sendEmail);

module.exports = router;