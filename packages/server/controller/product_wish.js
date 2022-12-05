const productWishModel = require("../services/product_wish");

async function getWishList(req, res) {
	
	const resultList = await productWishModel.getWishList(req.query);
	res.status(200).json({ wishList: resultList });
}

async function addWishProduct(req, res) {
	
	const resultWish = await productWishModel.addWishProduct(req.body);
	res
		.status(200)
		.json({ wish_item_seq: resultWish, message: "찜 상품이 추가되었습니다!" });
}

async function delWishProduct(req, res) {
	
	const resultDel = await productWishModel.delWishProduct(req.params);
	return res.status(200).json({ message: "찜 상품이 삭제되었습니다!" });
}


module.exports = {
	getWishList,
	addWishProduct,
	delWishProduct,
};
