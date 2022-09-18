const dbPool = require("../db");

async function addToCart(item) {
	console.log("service item : ", item);
	try {
		const resultCart = await dbPool.query(
			`INSERT INTO tb_cart SET
				user_seq = ${item.user_seq},
				total_product_count = ${item.total_product_count},
				status = "0",
				cart_total_price = ${item.cart_total_price},
				delivery_price = ${item.delivery_price},
				total_cart_discount_price = ${item.total_cart_discount_price},
				total_accumulate_price = ${item.total_accumulate_price},
				payment_price = ${item.payment_price},
				create_dtm = now(),
				update_dtm = now()
			ON DUPLICATE KEY UPDATE
				total_product_count = CONVERT(total_product_count, UNSIGNED) + ${item.total_product_count},
				cart_total_price = CONVERT(cart_total_price, UNSIGNED) + ${item.cart_total_price},
				delivery_price = ${item.delivery_price},
				total_cart_discount_price = CONVERT(total_cart_discount_price, UNSIGNED) + ${item.total_cart_discount_price},
				total_accumulate_price = CONVERT(total_accumulate_price, UNSIGNED) + ${item.total_accumulate_price},
				payment_price = CONVERT(payment_price, UNSIGNED) + ${item.payment_price},
				update_dtm = now();`
		);
		console.log("resultCart : ", resultCart[0].insertId);
		const resultCartUpdate = await dbPool.query(
			// `INSERT INTO tb_cart_detail SET
			// 	product_view_seq = ${item.product_view_seq},
			// 	product_seq = ${item.product_seq},
			// 	user_seq = ${item.user_seq},
			// 	cart_seq = ${resultCart[0].insertId},
			// 	products_buy_count = ${item.products_buy_count},
			// 	products_total_price = ${item.products_total_price},
			// 	is_delete = "1",
			// 	create_dtm = now(),
			// 	update_dtm = now()
			// ON DUPLICATE KEY UPDATE
			// 	products_buy_count = CONVERT(products_buy_count, UNSIGNED) + ${item.products_buy_count},
			// 	products_total_price = CONVERT(products_total_price, UNSIGNED) + ${item.products_total_price},
			// 	is_delete = "1",
			// 	update_dtm = now();`
			`UPDATE tb_cart_detail SET
				products_buy_count = CONVERT(products_buy_count, UNSIGNED) + ${item.products_buy_count},
			 	products_total_price = CONVERT(products_total_price, UNSIGNED) + ${item.products_total_price},
			 	is_delete = "1",
			 	update_dtm = now()
			WHERE product_seq = ${item.product_seq}
			AND user_seq = ${item.user_seq}`
		);
		console.log("resultCartUpdate : ", resultCartUpdate[0]);
		if (resultCartUpdate[0].affectedRows == 0) {
			const resultCartInsert = await dbPool.query(
				`INSERT INTO tb_cart_detail SET
					product_view_seq = ${item.product_view_seq},
					product_seq = ${item.product_seq},
					user_seq = ${item.user_seq},
					cart_seq = ${resultCart[0].insertId},
					products_buy_count = ${item.products_buy_count},
					products_total_price = ${item.products_total_price},
					is_delete = "1",
					create_dtm = now(),
					update_dtm = now()`
			);
			console.log("resultCartInsert : ", resultCartInsert[0]);
			return {
				cart: resultCart[0].insertId,
				cartDetail: resultCartInsert[0].insertId,
			};
		}
		return {
			cart: resultCart[0].insertId,
			cartDetail: resultCartUpdate[0].info,
		};
	} catch (e) {
		console.log(e);
	}
}

async function getCartList(user) {
	console.log("getCartList : ", user);
	try {
		const result = await dbPool.query(
			`SELECT tb1.*, tb2.*, tb3.product_name, tb3.product_price, tb3.discount_price, tb3.product_status, tb4.packaging_type, tb5.product_img
			FROM tb_cart tb1
			INNER JOIN tb_cart_detail tb2
			ON tb1.cart_seq = tb2.cart_seq
			LEFT JOIN tb_product tb3
			ON tb2.product_seq = tb3.product_seq
			LEFT JOIN tb_product_view tb4
			ON tb2.product_seq = tb4.product_seq
			LEFT JOIN tb_product_img tb5
			ON tb2.product_seq = tb5.product_seq		
			WHERE tb1.user_seq = "${user.user_seq}"
			AND tb2.is_delete = "1"
			AND tb3.product_status = "1"
			AND tb5.product_img_type = "0"`
		);
		console.log("getCartList DB result : ", result[0]);
		return result[0];
	} catch (e) {
		console.log(e);
	}
}

async function deleteToCart(items) {
	console.log("deleteToCart : ", items.cart_detail_seq);
	const productCount = [];
	let sum = 0;
	try {
		for await (const seq of items.cart_detail_seq) {
			const result = await dbPool.query(
				`SELECT *
				FROM tb_cart_detail tb
				WHERE tb.cart_detail_seq = "${seq}"
				AND tb.is_delete = "1"`
			);
			productCount.push(result[0][0]);
			sum += parseInt(result[0][0].products_buy_count);
		}
		console.log("productCount : ", productCount, sum);
		const result = await dbPool.query(
			`SELECT total_product_count
			FROM tb_cart tb
			WHERE tb.cart_seq = "${items.cart_seq}"`
		);
		const count = parseInt(result[0][0].total_product_count);
		console.log("resutl cart : ", count);
		if (count == sum) {
			const result = await dbPool.query(
				`DELETE tb1, tb2
				FROM tb_cart tb1
				LEFT JOIN tb_cart_detail tb2
				ON tb1.cart_seq = tb2.cart_seq
				WHERE tb1.cart_seq = "${items.cart_seq}"
				AND tb2.is_delete = "1"`
			);
			console.log("del : ", result[0]);
			return result[0].affectedRows;
		} else {
			const resultUpdate = await dbPool.query(
				`UPDATE tb_cart tb1
				JOIN tb_cart_detail tb2
				ON tb1.cart_seq = tb2.cart_seq
				SET tb1.total_product_count = CONVERT(tb1.total_product_count, UNSIGNED) - "${items.product_buy_count}",
					tb1.cart_total_price = CONVERT(tb1.cart_total_price, UNSIGNED) - "${items.product_total_price}",
					tb1.total_cart_discount_price = CONVERT(tb1.total_cart_discount_price, UNSIGNED) - "${items.discount_price}",
					tb1.total_accumulate_price = CONVERT(tb1.total_accumulate_price, UNSIGNED) - "${items.accumulate_price}",
					tb1.payment_price = CONVERT(tb1.payment_price, UNSIGNED) - "${items.product_total_price}",
					tb1.delivery_price = CASE WHEN CONVERT(tb1.payment_price, UNSIGNED) - "${items.product_total_price}" < 40000 THEN 3000 ELSE tb1.delivery_price END,
					tb1.update_dtm = now()
				WHERE tb2.cart_detail_seq = "${items.cart_detail_seq}"`
			);
			console.log("del up : ", resultUpdate[0]);
			const resultDel = await dbPool.query(
				`DELETE FROM tb_cart_detail
				WHERE cart_detail_seq = "${items.cart_detail_seq}"`
			);
			console.log("del del : ", resultDel[0]);
			return [resultUpdate[0].info, resultDel[0].affectedRows];
		}
	} catch (e) {
		console.log(e);
	}
}

async function updateToCart(item) {
	console.log("update : ", item);
	try {
		const result = await dbPool.query(
			`UPDATE tb_cart tb1
			JOIN tb_cart_detail tb2
			ON tb1.cart_seq = tb2.cart_seq
			SET tb1.total_product_count = "${item.total_product_count}",
				tb1.cart_total_price = "${item.cart_total_price}",
				tb1.delivery_price = "${item.delivery_price}",
				tb1.total_cart_discount_price = "${item.total_cart_discount_price}",
				tb1.total_accumulate_price = "${item.total_accumulate_price}",
				tb1.payment_price = "${item.payment_price}",
				tb1.update_dtm = now(),
				tb2.products_buy_count = "${item.products_buy_count}",
				tb2.products_total_price = "${item.products_total_price}",
				tb2.update_dtm = now()
			WHERE tb1.cart_seq = "${item.cart_seq}"
			AND tb2.user_seq = "${item.user_seq}"
			AND tb2.product_seq = "${item.product_seq}"
			AND tb2.cart_detail_seq = "${item.cart_detail_seq}"`
		);
		console.log(result[0].info);
		return result[0].info;
	} catch (e) {
		console.log(e);
	}
}

module.exports = {
	addToCart,
	getCartList,
	deleteToCart,
	updateToCart,
};
