const express = require("express");
const router = express.Router();
const usersController = require("../controller/users.js");

// 비밀번호 재설정
router.put("/resetpw", usersController.resetPassword);

router.get("/check/id", usersController.checkedUserInfo);

router.get("/check/email", usersController.checkedUserInfo);

module.exports = router;
