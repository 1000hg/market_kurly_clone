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
				product_view_seq=?,
        category_seq=?,
        is_delete=?,
        create_dtm=?,
        update_dtm=?`,
			[
				item.user_seq,
				item.product_seq,
				item.product_view_seq,
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
      `SELECT
        tb1.wish_item_seq, tb1.user_seq, tb1.category_seq,
        tb2.product_seq, tb2.product_name, tb2.product_price, tb2.product_stock,
        tb2.product_origin, tb2.product_status, tb2.discount_price, tb2.discount_rate,
        tb2.accumulate_price, tb2.product_discount_price, tb2.is_coupon,
        tb3.product_view_seq, tb4.product_img_seq, tb4.product_img
      FROM tb_wish_item tb1
      INNER JOIN tb_product tb2
      ON tb2.product_seq = tb1.product_seq
      INNER JOIN tb_product_view tb3
      ON tb3.product_seq = tb2.product_seq
      INNER JOIN tb_product_img tb4
      ON tb4.product_seq = tb3.product_seq
      WHERE tb1.user_seq = ${parseInt(user.user_seq)}
      AND tb1.is_delete = "1"
      AND tb4.product_img_type = "0"`
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

async function delWishProduct2(item) {
	
	try {
		dbPool.query(
			`UPDATE tb_product_view
			SET dib_count = dib_count - 1
			WHERE product_view_seq = "${item.product_view_seq}"`
		);
		const result = await dbPool.query(
			`UPDATE tb_wish_item
			SET is_delete = 0
			WHERE product_view_seq = "${item.product_view_seq}" and user_seq = "${item.user_seq}"`
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
	delWishProduct2
};
