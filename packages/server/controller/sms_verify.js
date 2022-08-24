const CryptoJS = require('crypto-js');
const NodeCache = require('node-cache');
const axios = require('axios');
const dotenv = require('dotenv');
const smsModel = require('../services/verify.js');
dotenv.config();

const myCache = new NodeCache()
// 인증코드 시그니쳐 생성 및 인증코드 발송
function makeSignature(user_phone) {
  
  const timestamp = Date.now().toString();
  const serviceId = process.env.SMS_SERVICE_ID;
  const secretKey = process.env.SMS_SECRET_KEY;
  const accessKey = process.env.SMS_ACCESS_KEY;
  const method = "POST";
  const space = " ";
  const newLine = "\n";
  const url = `https://sens.apigw.ntruss.com/sms/v2/services/${serviceId}/messages`;
  const uri = `/sms/v2/services/${serviceId}/messages`;

  const hmac = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, secretKey);
  hmac.update(method);
  hmac.update(space);
  hmac.update(uri);
  hmac.update(newLine);
  hmac.update(timestamp);
  hmac.update(newLine);
  hmac.update(accessKey);

  const hash = hmac.finalize();
  const signature = hash.toString(CryptoJS.enc.Base64);
  const verifyCode = Math.floor(Math.random() * 9000000) + 1000000;
  // cache에 인증코드 저장과 만료시간 3분 설정
  myCache.set( "code", verifyCode, 180);

  // sms 인증코드 전송
  // axios({
  //   method: method,
  //   url: url,
  //   headers: {
  //     "Contenc-type": "application/json; charset=utf-8",
  //     "x-ncp-iam-access-key": accessKey,
  //     "x-ncp-apigw-timestamp": timestamp,
  //     "x-ncp-apigw-signature-v2": signature,
  //   },
  //   data: {
  //     type: "SMS",
  //     countryCode: "82",
  //     from: "01094175385",
  //     content: `[kurly] 인증번호 [${verifyCode}]를 입해주세요!`,
  //     messages: [{ to: `${user_phone}` }],
  //   },
  // })
  // .catch(error => {
  //   console.error(error);
  // })
  return verifyCode;
}

// 인증코드 발송함수
async function smsSend(req, res) {
  
  const isValidUser = await smsModel.findByUser(req.body);
  // 이름과 폰번호로 회원이 존재하지 않을 경우
  if (!isValidUser) {
    return res.status(409).json({ message: '가입시 입력하신 회원 정보가 맞는지 다시 한번 확인해 주세요!'});
  }

  const smsCode = makeSignature(req.body.user_phone);
  res.status(202).json({ verifyCode: smsCode, message : "인증코드가 발송되었습니다."})

}

// 인증코드 확인
async function smsVerify(req, res) { 

  const verify_code = req.body.verify_code;

  if (verify_code == myCache.get("code")) {
    const isValidUser = await smsModel.findByUser(req.body);
    res.status(200).json({ 
      user_id : isValidUser.user_id,
      create_dtm: isValidUser.create_dtm,
      massage: isValidUser.message });
  } else {
    res.status(400).json({ message : "입력하신 번호가 맞는지 확인해주세요!"});
  }

}

module.exports = {
  smsSend,
  smsVerify,
}