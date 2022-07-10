const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const authController = require('../controller/auth.js');
const isAuth = require('../common/auth.js');

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  return res.status(400).json({message: errors.array()[0].msg});
}

const validateLogin = [
  body('user_id').notEmpty().withMessage('아이디를 입력하세요!').trim().isLength({min: 4}).withMessage('4자 이상 입력하세요!'),
  body('user_password').notEmpty().withMessage('비밀번호를 입력하세요!').isLength({min: 4}).withMessage('4자 이상 입력하세요!'),
  validate,
]

const validateSignup = [
  ...validateLogin,
  body('user_name').notEmpty().withMessage('이름을 입력하세요!').trim(),
  body('user_email').notEmpty().withMessage('이메일을 입력하세요!').isEmail().withMessage('이메일을 잘 입력하세요!').normalizeEmail(),
  body('user_phone').notEmpty().withMessage('전화번호를 입력하세요!').trim(),
  body('zip_code').isString().trim().optional({ nullable: true, checkFalsy: true }),
  body('address').notEmpty().withMessage('주소를 입력하세요!').trim(),
  body('address_detail').isString().trim().optional({ nullable: true, checkFalsy: true }),
  body('user_birth').isString().trim().optional({ nullable: true, checkFalsy: true }),
  body('gender').notEmpty().withMessage('성별을 체크하세요!'),
  body('reffer_id').isString().trim().optional({ nullable: true, checkFalsy: true }),
  body('join_event_name').isString().trim().optional({ nullable: true, checkFalsy: true }),
  validate
]

router.post('/signup', validateSignup, authController.signup);

router.post('/login', validateLogin, authController.login);

router.get('/me', isAuth, authController.me);

module.exports = router;