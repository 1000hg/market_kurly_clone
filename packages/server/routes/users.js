const express = require("express");
const router = express.Router();
const usersController = require("../controller/users.js");
const isAuth = require('../common/auth.js');

// 비밀번호 재설정
router.put("/resetpw", usersController.resetPassword);

router.get("/check/id", usersController.checkedUserInfo);

router.get("/check/email", usersController.checkedUserInfo);

router.post("/check/pw", isAuth, usersController.checkedUserPw);

router.get("/address", isAuth, usersController.userAddress);

router.post("/address/add", isAuth, usersController.addAddress);

router.delete("/address/del/:seq", isAuth, usersController.delAddress);

router.put("/address/update", isAuth, usersController.changeAddress);

module.exports = router;
