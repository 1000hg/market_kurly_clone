const guestModel = require("../services/guest");

async function addToCart(req, res) {
	
	const result = await guestModel.insertToCart(req.body);
	res.status(200).json({
		guest_seq: result.guest_seq,
		info: result.product_seq,
		message: "장바구니에 추가 되었습니다!",
	});

}

async function getCart(req, res) {
	
	const resultList = await guestModel.getCartList(req.query);
	res.status(200).json({ cartList: resultList });

}

async function countCart(req, res) {

	const resultCount = await guestModel.getCartCount(req.query);
	res.status(200).json({ countCart: resultCount });

}

async function updateCart(req, res) {
	
	const resultUpdate = await guestModel.updateToCart(req.body);
	res.status(200).json({
		updated_cart_item: resultUpdate,
		message: "장바구니에 상품이 업데이트되었습니다!",
	});

}

async function delCart(req, res) {

	const resultDelete = await guestModel.deleteCart(req.body);
	res.status(200).json({
		delete_cart_item: resultDelete,
		message: "장바구니 상품이 삭제되었습니다!",
	});
	
}

module.exports = {
	addToCart,
	getCart,
	countCart,
	updateCart,
	delCart,
};
