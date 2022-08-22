const productWishModel = require("../services/product_wish");

async function getWishList(req, res) {
	
}

async function addWishProduct(req, res) {
	
	const resultWish = await productWishModel.addWishProduct(req.body);
	res
		.status(200)
		.json({ wish_item_seq: resultWish, message: "찜 상품이 추가되었습니다!" });
}

async function delWishProduct(req, res) {
	
}

module.exports = {
	getWishList,
	addWishProduct,
	delWishProduct,
};
