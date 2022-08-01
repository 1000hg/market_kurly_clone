const bcrypt = require('bcrypt');
const {} = require('express-async-errors');
const usersModel = require('../services/users.js')
const dotenv = require('dotenv');
dotenv.config();

const bcryptSalt = process.env.BCRYPT_SALT;

async function resetPassword(req, res) {
  
  const hashed = await bcrypt.hash(req.body.user_password, parseInt(bcryptSalt));
  req.body.user_password = hashed;
  const resetInfo = await usersModel.resetPw(req.body);
  res.status(200).json({ resetInfo })
  
}

module.exports = {
  resetPassword,
}