const paymentModel = require("../services/payment");

async function paymentCart(req, res) {
	
	result = await paymentModel.payOut(req.body);
	res
		.status(200)
		.json({ payment_seq: result, message: "장바구니가 지불되었습니다!" });
}

async function paymentList(req, res) {
	
	result = await paymentModel.payOutList(req.query);
	res.status(200).json({ paymentList: result });
}

module.exports = {
	paymentCart,
	paymentList,
};
