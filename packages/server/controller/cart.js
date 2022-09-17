const cartModel = require("../services/cart");

async function addProductToCart(req, res) {
	console.log("controller add cart : ", req.body);
	const result = await cartModel.addToCart(req.body);
	res.status(200).json({
		cart_seq: result.cart,
		cart_detail_seq: result.cartDetail,
		message: "장바구니에 추가 되었습니다!",
	});
}

async function getProductsToCart(req, res) {
	console.log("controller getCart list : ", req.query);
	const resultList = await cartModel.getCartList(req.query);
	console.log("controller getCart result : ", resultList);
	res.status(200).json({ cartList: resultList });
}

async function deleteProductsToCart(req, res) {
	console.log("controller cart del : ", req.body);
	const resultDelete = await cartModel.deleteToCart(req.body);
	console.log("controller cart del result : ", resultDelete);
	res.status(200).json({
		delete_cart_item: resultDelete,
		message: "장바구니 상품이 삭제되었습니다!",
	});
}

async function updateProductToCart(req, res) {
	console.log("controller cart update : ", req.body);
	const resultUpdate = await cartModel.updateToCart(req.body);
	console.log("controller cart update result : ", resultUpdate);
	res.status(200).json({
		updated_cart_item: resultUpdate,
		message: "장바구니에 상품이 업데이트되었습니다!",
	});
}

module.exports = {
	addProductToCart,
	getProductsToCart,
	deleteProductsToCart,
	updateProductToCart,
};
