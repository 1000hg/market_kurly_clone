const dbPool = require("../db");

async function insertCartDetail(item, insertId) {
	const [resultCartDetailInsert] = await dbPool.query(
		`INSERT INTO tb_cart_detail SET
			product_view_seq = ${item.product_view_seq},
			product_seq = ${item.product_seq},
			user_seq = ${item.user_seq},
			cart_seq = ${insertId},
			products_buy_count = ${item.products_buy_count},
			products_total_price = ${item.total_price},
			is_delete = "1",
			create_dtm = now(),
			update_dtm = now()`
	);
	
	return resultCartDetailInsert.insertId;
}

async function insertCart(item) {
   
	try {
		const [resultCartInsert] = await dbPool.query(
			`INSERT INTO tb_cart (
				user_seq, 
				total_product_count, 
				status, 
				cart_total_price, 
				delivery_price, 
				total_cart_discount_price, 
				total_accumulate_price, 
				payment_price, 
				create_dtm, 
				update_dtm)
			SELECT 
				${item.user_seq}, 
				'${item.products_buy_count}', 
				'0', 
				'${item.total_price}', 
				'${item.payment_price > 43000 ? 0 : 3000}', 
				'${item.total_discount_price}', 
				'${item.total_accumulate_price}', 
				'${item.total_price - item.total_discount_price}', 
				now(), 
				now() 
			FROM DUAL WHERE NOT EXISTS (
				SELECT user_seq, status 
					FROM tb_cart 
				 WHERE user_seq = ${item.user_seq} 
					 AND status = "0");`
		);
		
		if (resultCartInsert.insertId == 0) {
			const [resultCardId] = await dbPool.query(
				`SELECT cart_seq, payment_price
					FROM tb_cart
				 WHERE user_seq = ${item.user_seq}
					 AND status = "0";`
			);
			
			const resultCartUpdate = await updateCart(item, resultCardId[0].payment_price);
			
			return resultCardId[0].cart_seq;
		}
		return resultCartInsert.insertId;
	} catch (e) {
		console.error(e);
	}
}

async function updateCartDetail(item, insertId=0) {

	const [resultCartDetailUpdate] = await dbPool.query(
		`UPDATE tb_cart_detail tb1 SET
			tb1.products_buy_count = CONVERT(tb1.products_buy_count, UNSIGNED) + ${item.products_buy_count},
			tb1.products_total_price = CONVERT(tb1.products_total_price, UNSIGNED) + ${item.total_price},
			tb1.update_dtm = now()
		WHERE tb1.user_seq = ${item.user_seq}
			AND tb1.product_seq = ${item.product_seq}
			AND tb1.is_delete = "1";`
	);
	if (resultCartDetailUpdate.affectedRows == 0) {
		const resultCartDetailInsert = await insertCartDetail(item, insertId);
		return resultCartDetailInsert;
	}
	return resultCartDetailUpdate.info;
}

async function updateCart(item, price) {
   
	try {
		const [resultCartUpdate] = await dbPool.query(
			`UPDATE tb_cart tb1 SET
				tb1.total_product_count = CONVERT(tb1.total_product_count, UNSIGNED) + ${parseInt(
						item.products_buy_count
				)},
				tb1.cart_total_price = CONVERT(tb1.cart_total_price, UNSIGNED) + ${parseInt(
						item.total_price
				)},
				tb1.delivery_price = ${
						parseInt(price) + parseInt(item.total_price) - parseInt(item.total_discount_price) > 43000 ? 0 : 3000
				},
				tb1.total_cart_discount_price = CONVERT(tb1.total_cart_discount_price, UNSIGNED) + ${parseInt(
						item.total_discount_price
				)},
				tb1.total_accumulate_price = CONVERT(tb1.total_accumulate_price, UNSIGNED) + ${parseInt(
						item.total_accumulate_price
				)},
				tb1.payment_price = CONVERT(tb1.payment_price, UNSIGNED) + ${parseInt(item.total_price) - parseInt(item.total_discount_price)},
				tb1.update_dtm = now()
			WHERE tb1.user_seq = ${item.user_seq}
				AND tb1.status = "0";`
		);
		
		return resultCartUpdate.info;
	} catch (e) {
		console.error(e);
	}
}

async function addToCart(item) {
   
	try {
		const [cartDetail] = await dbPool.query(
			`SELECT tb1.*, tb2.cart_seq, tb2.payment_price
				 FROM tb_cart_detail tb1, tb_cart tb2
				WHERE tb2.user_seq = ${item.user_seq}
					AND tb1.product_seq = ${item.product_seq}
					AND tb1.is_delete = "1"`
		);
		
		if (!cartDetail.length) {
			const resultInsertCart = await insertCart(item); 
			const resultInsertCartDetail = await insertCartDetail(item, resultInsertCart);
			
			return { cart: resultInsertCart, cartDetail: resultInsertCartDetail };
		} else {
			const resultUpdateCart = await updateCart(item, cartDetail[0].payment_price);
			const resultCartDetailUpdate = await updateCartDetail(item, cartDetail[0].cart_seq);
			
			return { cart: resultUpdateCart, cartDetail: resultCartDetailUpdate };
		}
	} catch (e) {
		console.log(e);
	}
}

async function getCartList(user) {
   
	try {
		const result = await dbPool.query(
			`SELECT tb1.*, tb2.*, 
				tb3.product_name, tb3.product_price, tb3.discount_price, tb3.product_status, 
				tb4.packaging_type, tb5.product_img
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
		
		return result[0];
	} catch (e) {
		console.log(e);
	}
}

async function deleteToCart(items) {
   
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
		
		const result = await dbPool.query(
			`SELECT total_product_count
				FROM tb_cart tb
			 WHERE tb.cart_seq = "${items.cart_seq}"`
		);
		const count = parseInt(result[0][0].total_product_count);
		
		if (count == sum) {
			const result = await dbPool.query(
				`DELETE tb1, tb2
				 FROM tb_cart tb1
				LEFT JOIN tb_cart_detail tb2
					 ON tb1.cart_seq = tb2.cart_seq
				WHERE tb1.cart_seq = "${items.cart_seq}"
					AND tb2.is_delete = "1"`
			);
		
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
			
			const resultDel = await dbPool.query(
				`DELETE FROM tb_cart_detail
					WHERE cart_detail_seq = "${items.cart_detail_seq}"`
			);
			
			return [resultUpdate[0].info, resultDel[0].affectedRows];
		}
	} catch (e) {
		console.log(e);
	}
}

async function updateToCart(item) {
   
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
		
		return result[0].info;
	} catch (e) {
		console.log(e);
	}
}

async function checkStock(user) {
  const [checkStock] = await dbPool.query(
    `SELECT tb1.product_seq, tb1.product_stock
    FROM tb_cart_detail tb2
    INNER JOIN tb_product tb1
    ON tb1.product_seq = tb2.product_seq
    WHERE tb2.user_seq = ${user.user_seq}
    AND tb2.is_delete = "1"
    ORDER BY tb1.product_stock ASC`
  );
  
  return checkStock;
}

async function orderCart(user) {
  
  try {
    const resultCheckStock = await checkStock(user);
    if (resultCheckStock[0].product_stock != "0") {
      const [order] = await dbPool.query(
        `SELECT
          tb1.user_name, tb1.user_phone, tb1.user_email,
          tb2.user_address_seq, tb2.zip_code, tb2.address, tb2.address_detail,
          tb2.default_address, tb2.receiver, tb2.receiver_phone, tb2.receiver_place,
          tb2.receiver_place_etc, tb2.door_pass, tb2.arrival_message_time
        FROM tb_user tb1
        INNER JOIN tb_user_address tb2
        ON tb1.user_seq = tb2.user_seq
        WHERE tb1.user_seq = ${user.user_seq}
        AND tb2.default_address = "1"`
      );
      
      const [coupon] = await dbPool.query(
        `SELECT
          tb1.user_coupon_seq, tb1.coupon_seq,
          tb2.coupon_seq, tb2.category_seq, tb2.coupon_name, tb2.coupon_description,
          tb2.coupon_action, tb2.coupon_percent,  tb2.coupon_price, tb2.max_price
        FROM tb_user_coupon tb1
        INNER JOIN tb_coupon tb2
        ON tb1.coupon_seq = tb2.coupon_seq
        WHERE tb1.user_seq = ${user.user_seq}
        AND tb1.is_use = "0"`
      );
      
      const [accumulator] = await dbPool.query(
        `SELECT
          sum(accumulate_price) as accumulate_price
        FROM tb_accumulate
        WHERE user_seq = ${user.user_seq}
        AND is_use = "0"`
      );
      
      const [paymentMethod] = await dbPool.query(
        `SELECT payment_method, payment_kind, is_installment
        FROM tb_payment
        WHERE user_seq = ${user.user_seq}
        ORDER BY paymented_dtm DESC LIMIT 1;`
      );
      
      return { order, coupon, accumulator, paymentMethod };
    } else {
      return { message: "품절된 상품이 있습니다!", resultCheckStock };
    }
  } catch (e) {
    console.error(e);
  }
}

module.exports = {
	addToCart,
	getCartList,
	deleteToCart,
	updateToCart,
	orderCart,
};