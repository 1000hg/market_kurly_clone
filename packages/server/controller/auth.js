const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {} = require('express-async-errors');
const usersModel = require('../models/auth.js')
const dotenv = require('dotenv');
dotenv.config();

const jwtSecretKey = process.env.JWT_SECRET;
const jwtExpiresInDays = process.env.JWT_EXPIRES_SEC;
const bcryptSalt = process.env.BCRYPT_SALT;

// id: test8 pw: 1234 : $2b$12$Qgc12Z67wpau5U/EtCFDHuYEutfZxH.KQe4SzwBovZnGKVQDcizh2
async function signup(req, res) {
  console.log("signupBefore : ", req.body);
  const { user_id, user_password, reffer_id } = req.body;
  const isValidUser = await usersModel.findByUser(user_id);
  console.log('signupisValidUser : ', isValidUser)

  // 같은 아이디가 있는지 확인
  if (isValidUser) {
    return res.status(409).json({ message: `${user_id}은 이미 있습니다!`});
  }

  // 추천인이 있는지 확인
  if (reffer_id) {
    const isValidUser = await usersModel.findByUser(reffer_id);
    if (!isValidUser) {
      return res.status(409).json({ message: `${reffer_id}는 없습니다!`})
    } else {
      // 추천인수 더하기
      usersModel.addRefferCount(reffer_id);
    }
  }

  // bcrypt로 비밀번호 암호화
  const hashed = await bcrypt.hash(user_password, bcryptSalt);
  req.body.user_password = hashed;
  const user_seq = await usersModel.createUser(req.body);
  // 클라이언트에게 보내줄 token 생성 및 아이디 클라이언트에 보냄
  const token = createJwtToken(user_seq);
  res.status(200).json({ token, user_id })
}

async function login(req, res) {
  console.log("loginBefore : ", req.body);
  const { user_id, user_password } = req.body;
  const isValidUser = await usersModel.findByUser(user_id);
  console.log('loginisValidUser : ', isValidUser)

  // 같은 아이디가 있는지 확인
  if (!isValidUser) {
    return res.status(409).json({ message: '이아디와 비밀번호가 유효하지 않습니다!'});
  }

  // 비밀번호가 같은지 확인
  const isValidPassword = await bcrypt.compare(user_password, isValidUser.user_password);
  if (!isValidPassword) {
    return res.status(401).json({ message: '아이디와 비밀번호가 유효하지 않습니다!'})
  }

  // 클라이언트에게 보내줄 token 생성 및 아이디 클라이언트에 보냄
  const token = createJwtToken(isValidUser.user_seq);
  res.status(200).json({ token, user_id});
}

async function me(req, res, next) {
  console.log("me : ", req.userId)
  const user = await usersModel.findByUser(req.userId);
  if (!user) {
    return res.status(404).json({ message: '로그인 되었는지 확인하세요!'});
  }
  res.status(200).json({ token: req.token, user_id: user.user_id });
}

function createJwtToken(user_seq) {
  return jwt.sign({ user_seq }, jwtSecretKey, { expiresIn: jwtExpiresInDays })
}

module.exports = {
  signup,
  login,
  me
}