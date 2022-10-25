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

async function paymentDetail(req, res) {
  
  result = await paymentModel.payOutDetail(req.query);
  res.status(200).json({ paymentDetail: result });
}

async function reorder(req, res) {
  result = await paymentModel.reorderToCart(req.body);
  res.status(200).json({ cart_seq: result });
}

module.exports = {
  paymentCart,
  paymentList,
  paymentDetail,
  reorder,
};
