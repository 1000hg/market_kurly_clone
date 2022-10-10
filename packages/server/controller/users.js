const bcrypt = require("bcrypt");
const {} = require("express-async-errors");
const usersModel = require("../services/users.js");
const authModel = require("../services/auth.js");
const dotenv = require("dotenv");
dotenv.config();

const bcryptSalt = process.env.BCRYPT_SALT;

async function resetPassword(req, res) {
	const hashed = await bcrypt.hash(
		req.body.user_password,
		parseInt(bcryptSalt)
	);
	req.body.user_password = hashed;
	const resetInfo = await usersModel.resetPw(req.body);
	res.status(200).json({ resetInfo });
}

async function checkedUserInfo(req, res) {
	const result = await usersModel.checkedUser(req.query);
	res.status(200).json(result);
}

async function checkedUserPw(req, res) {
	const { user_id, user_password } = req.body;
	const isValidUser = await authModel.findByUser(user_id);

	// 같은 아이디가 있는지 확인
	if (!isValidUser) {
		return res
			.status(409)
			.json({ message: "아이디와 비밀번호가 유효하지 않습니다!" });
	}

	// 비밀번호가 같은지 확인
	const isValidPassword = await bcrypt.compare(
		user_password,
		isValidUser.user_password
	);
	if (!isValidPassword) {
		return res
			.status(401)
			.json({ message: "아이디와 비밀번호가 유효하지 않습니다!" });
	}

	res.status(200).json({ userInfo: isValidUser });
}

async function userAddress(req, res) {
	
	const isValidUser = await usersModel.findByAddress(req.query);
	return res.status(200).json(isValidUser);
}

async function addAddress(req, res) {
	
	const result = await usersModel.addUserAddress(req.body);
	return res.status(200).json({ user_address_seq: result, message: "저장 되었습니다." });
}

async function delAddress(req, res) {

	const result = await usersModel.delAddress(req.params);
	return res.status(200).json({ message : "주소가 삭제되었습니다!" });
}

async function changeAddress(req, res) {

	const result = await usersModel.updateAddress(req.body);
	return res.status(200).json({ message: result});
}

module.exports = {
	resetPassword,
	checkedUserInfo,
	checkedUserPw,
	userAddress,
	addAddress,
	delAddress,
	changeAddress
};