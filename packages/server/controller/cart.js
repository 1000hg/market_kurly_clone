const cartModel = require("../services/cart");

async function addProductToCart(req, res) {
	const result = await cartModel.addToCart(req.body);
	res.status(200).json({
		cart_seq: result.cart,
		cart_detail_seq: result.cartDetail,
		message: "장바구니에 추가 되었습니다!",
	});
}

async function getProductsToCart(req, res) {
	
	const resultList = await cartModel.getCartList(req.query);
	res.status(200).json({ cartList: resultList });
}

async function deleteProductsToCart(req, res) {
	const resultDelete = await cartModel.deleteToCart(req.body);
	res.status(200).json({
		delete_cart_item: resultDelete,
		message: "장바구니 상품이 삭제되었습니다!",
	});
}

async function updateProductToCart(req, res) {
	
	const resultUpdate = await cartModel.updateToCart(req.body);	
	res.status(200).json({
		updated_cart_item: resultUpdate,
		message: "장바구니에 상품이 업데이트되었습니다!",
	});
}

async function orderProductsToCart(req, res) {
	
	const orderSheet = await cartModel.orderCart(req.query);
	res.status(200).json({ orderSheet });
}

module.exports = {
	addProductToCart,
	getProductsToCart,
	deleteProductsToCart,
	updateProductToCart,
	orderProductsToCart,
};
