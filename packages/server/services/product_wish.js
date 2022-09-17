const dbPool = require("../db");

async function addWishProduct(item) {
	
	try {
		dbPool.query(
			`UPDATE tb_product_view
			SET dib_count = dib_count + 1
			WHERE product_seq = "${item.product_seq}"`
		);
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

async function getWishList(user) {
	
	try {
		const result = await dbPool.query(
			`SELECT *
			FROM tb_wish_item tb2
			INNER JOIN tb_product tb1
			ON tb1.product_seq = tb2.product_seq
			INNER JOIN tb_product_img tb3
			ON tb2.product_seq = tb3.product_seq
			WHERE tb2.user_seq = "${user.user_seq}"
			AND tb3.product_img_type = "0"`
		);
		
		return result[0];
	} catch (e) {
		console.error(e);
	}
}

async function delWishProduct(item) {
	
	try {
		dbPool.query(
			`UPDATE tb_product_view
			SET dib_count = dib_count - 1
			WHERE product_seq = (
				SELECT product_seq
				FROM tb_wish_item
				WHERE wish_item_seq = "${item.seq}"
			)`
		);
		const result = await dbPool.query(
			`UPDATE tb_wish_item
			SET is_delete = 0
			WHERE wish_item_seq = "${item.seq}"`
		);
		
		return result[0].affectedRows;
	} catch (e) {
		console.log.error(e);
	}
}


module.exports = {
	addWishProduct,
	getWishList,
	delWishProduct,
};
