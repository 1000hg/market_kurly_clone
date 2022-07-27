const CryptoJS = require('crypto-js');
const axios = require('axios');
const smsModel = require('../services/sms_verify.js');

function makeSignature() {
  const serviceId = 'ncp:sms:kr:289761683539:market_kurly_auth';
	const space = " ";				// one space
	const newLine = "\n";				// new line
	const method = "POST";				// method
	const url = `/sms/v2/services/${serviceId}/messages`;	// url (include query string)
	const timestamp = Date.now().toString();			// current timestamp (epoch)
	const accessKey = "f3ySmzmqHLM5DJg6JvvO";			// access key id (from portal or Sub Account)
	const secretKey = "PazvMWqLjkHLDj93TI8d4Key77QShowZbMe3MxZE";			// secret key (from portal or Sub Account)

	const hmac = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, secretKey);
	hmac.update(method);
	hmac.update(space);
	hmac.update(url);
	hmac.update(newLine);
	hmac.update(timestamp);
	hmac.update(newLine);
	hmac.update(accessKey);

	const hash = hmac.finalize();
	return hash.toString(CryptoJS.enc.Base64);
}

function sendSMS(signature, phone) {
  const serviceId = 'ncp:sms:kr:289761683539:market_kurly_auth';
  // 인증코드생성
  const verifyCode = Math.floor(Math.random() * 1000000);

  axios({
    mathod: "post",
    url: `https://sens.apigw.ntruss.com/sms/v2/services/${serviceId}/messages`,
    headers: {
      "Content-Type" : "application/json; charset=utf-8",
      "x-ncp-apigw-timestamp" : Date.now().toString(),
      "x-ncp-iam-access-key" : "f3ySmzmqHLM5DJg6JvvO",
      "x-ncp-apigw-signature-v2": signature,      
    },
    data: {
      "type": "SMS",
      "contentType": "COMM",
      "countryCode": "82",
      "from": "01094175385",
      "content": `[kurly] 인증번호 [${verifyCode}]를 입해주세요!`,
      "messages":[
        {
          "to": `${phone}`
        }
      ],
    }
  })
  .then(res => {
    console.log("axios res : ", res.data)
    res.status(200).json({ "user_phone": "010"});
  })
  .catch(error => {
    console.log("axios error : ", error)
  })
}

async function serchPhoneNumber(req, res) {
  const { user_name, user_phone } = req.body;
  const isValidUser = await smsModel.findById(user_name, user_phone);
  console.log('serchPhoneNumber : ', isValidUser);

  // 이름과 폰번호로 회원이 존재하지 않을 경우
  if (!isValidUser) {
    return res.status(409).json({ message: '가입시 입력하신 회원 정보가 맞는지 다시 한번 확인해 주세요!'});
    return false;
  }

  const signature = makeSignature();

  sendSMS(signature, user_phone);
  
}

module.exports = {
  serchPhoneNumber,
}