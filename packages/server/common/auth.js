const jwt = require('jsonwebtoken');
const usersModel = require('../services/auth.js');
const dotenv = require('dotenv');
dotenv.config();

const AUTH_ERR = { message: '로그인하세요!' };

const isAuth = async (req, res, next) => {
  const authHeader = req.get('Authorization');
  if (!(authHeader && authHeader.startsWith('Bearer '))) {
    return res.status(401).json(AUTH_ERR);
  }

  const token = authHeader.split(' ')[1];

  jwt.verify(
    token,
    procss.env.JWT_SECRET,
    async (error, decoded) => {
      if (error) {
        return res.status(401).json(AUTH_ERR);
      }
      const user = await usersModel.findByUserSeq(decoded.user_seq);      
      
      if (!user) {
        return res.status(401).json({AUTH_ERR});
      }
      
      req.userId = user.user_id;
      req.token = token;
      
      next();
    }
  )
}

module.exports = isAuth;
