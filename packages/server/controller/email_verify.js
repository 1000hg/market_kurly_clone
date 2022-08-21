const nodemailer = require('nodemailer');
const NodeCache = require('node-cache');
const dotenv = require('dotenv');
const emailModel = require('../services/verify.js');
dotenv.config();

const myCache = new NodeCache();
// SMTP 전송구성
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SERVER,
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_SENDER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    // do not fail on invalid certs
    rejectUnauthorized: false,
  },
});

// 아이디 일부 가리기
function hideId(userId) {
  let id = [];
  for (let i = 0; i < userId.length; i++) {
    if (i < 6) {
      id.push(userId[i]);
    } else {
      id.push('*');
    }
  }

  return id.join('');
}

// 가려진 아이디 보내기
async function sendId(req, res) {
  
  const isValidUser = await emailModel.findByUser(req.body);
  // 이름과 폰번호로 회원이 존재하지 않을 경우
  if (!isValidUser) {
    return res.status(409).json({
      message: '가입시 입력하신 회원 정보가 맞는지 다시 한번 확인해 주세요!',
    });
  }
  const id = hideId(isValidUser.user_id);

  res.status(202).json({ 
    user_id: id,
    create_dtm: isValidUser.create_dtm,
    message: isValidUser.message 
  });
}

// 보낼 메시지 구성
function massegeConfig(item, isValidUser) {
  // 인증코드 시간설정
  const verifyCode = Math.floor(Math.random() * 1000000);
  myCache.set('code', verifyCode, 180);

  let sendText = `요청하신 아이디를 알려드립니다.\n ${isValidUser.user_id}`;
  let html = `<div>${isValidUser.user_name}님 안녕하세요. 컬리입니다.</div>
              <div>요청하신 <b>아이디</b>를 안내드립니다.</div><br><br>
              <div>ID : ${isValidUser.user_id}</div>`;

  if (Object.keys(item)[0] == 'user_id') {
    sendText = '비밀번호를 재설정 해주세요.';
    html = `<div>${isValidUser.user_name}님 안녕하세요. 컬리입니다.</div>
            <div>아래 버튼을 눌러 <b>비밀번호</b>를 재설정 해주세요.</div><br><br>
            <a href="https://www.kurly.com/member/find/password/reset?token=62e5fbeb3c24cb7803fa52d7" target="_blank" rel="noreferrer noopener"><img src="https://res.kurly.com/images/edm/2021/1005/btn_password_change.png" width="170" height="44" alt="비밀번호 재설정" border="0" style="display:block" loading="lazy"></a>`;
  }

  const message = {
    from: 'gwanmu@naver.com',
    to: `${isValidUser.user_email}`,
    subject: `[market_kurly] ${isValidUser.message}`,
    text: `${isValidUser.user_name}님 안녕하세요. 컬리입니다.
    ${sendText}`,
    html: html,
  };

  return message;
}

// 아이디와 비밀번호 재설정 메일 보내기
async function sendEmail(req, res) {
  const isValidUser = await emailModel.findByUser(req.body);
  // 보낼 메시지 구성
  const message = massegeConfig(req.body, isValidUser);

  transporter.sendMail(message, (err, info) => {
    if (err) {
      console.error('error : ', err);
    } else {
      console.log('info : ', info);
      res
        .status(200)
        .json({ to: info.envelope.to[0], message: '메일이 발송되었습니다.' });
    }
  });
}

// 메일사용 비밀번호 변경 시간확긴 함수구현

module.exports = {
  sendId,
  sendEmail,
};
