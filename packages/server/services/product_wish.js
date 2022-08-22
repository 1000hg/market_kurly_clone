const dbPool = require("../db");

async function addWishProduct(item) {
	
	try {
		const result = await dbPool.query(
			`INSERT INTO tb_wish_item SET
        user_seq=?,
        product_seq=?,
        category_seq=?,
        is_delete=?,
        create_dtm=?,
        update_dtm=?`,
			[
				item.user_seq,
				item.product_seq,
				item.category_seq,
				1,
				new Date(),
				new Date(),
			]
		);

		return result[0].insertId;
	} catch (e) {
		console.error(e);
	}
}

module.exports = {
	addWishProduct,
};
