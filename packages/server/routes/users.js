const express = require('express');
const router = express.Router();
const usersController = require('../controller/users.js');

// 비밀번호 재설정
router.put('/resetpw', usersController.resetPassword);

module.exports = router;