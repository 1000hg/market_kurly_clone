const dbPool = require("../db");

async function accumulateInsert(item) {
	try {		
		if (parseInt(item.used_accumulate) != 0) {
			const usedAccumulate = await dbPool.query(
				`INSERT INTO tb_accumulate SET
					user_seq=${item.user_seq},
					accumulate_price="${item.used_accumulate}",
					is_use="1",
					use_time=now(),
					create_dtm=now()`
			);
		} 

		if (parseInt(item.accumulate_price) != 0) {
			const insertAccumulate = await dbPool.query(
				`INSERT INTO tb_accumulate SET
					user_seq=${item.user_seq},
					accumulate_price="${item.accumulate_price}",
					is_use="0",
					use_time=now(),
					create_dtm=now()`
			);
		} 

		const [finalAccumulate] = await dbPool.query(
			`SELECT
				user_seq,
				SUM(CASE WHEN is_use = "0" THEN accumulate_price ELSE accumulate_price * -1 END) AS accumulated_price
			FROM tb_accumulate WHERE user_seq = ${item.user_seq}
			GROUP BY user_seq`
		);

		const [updateFinalAccumulate] = await dbPool.query(
			`INSERT INTO tb_user_accumulate SET
				user_seq = ${item.user_seq},
				my_accumulate = ${item.accumulate_price},
				create_dtm = now()
			ON DUPLICATE KEY UPDATE
				my_accumulate = ${finalAccumulate[0].accumulated_price},
				update_dtm = now()`
		);

		return updateFinalAccumulate;
	} catch (e) {
		console.error(e);
	}
}

async function payOut(item) {
	
	try {
		const resultPayment = await dbPool.query(
			`INSERT INTO tb_payment SET
				cart_seq=${item.cart_seq},
				user_seq=${item.user_seq},
				payment_method="${item.payment_method}",
				payment_kind="${item.payment_kind}",
				is_installment="${item.is_installment}",
				receiver="${item.receiver}",
				receiver_phone="${item.receiver_phone}",
				receive_place="${item.receive_place}",
				door_password="${item.door_password}",
				receive_place_etc="${item.receive_place_etc}",
				arrival_message_time="${item.arrival_message_time}",
				paymented_dtm=now();`
		);
		
		const insertAccumulate = await accumulateInsert(item);
		if (resultPayment[0].includes != 0) {
			const resultUp = await dbPool.query(
				`UPDATE tb_cart tb1, 
								tb_cart_detail tb2
						SET tb1.status = "1",
								tb1.update_dtm = now(),
								tb2.is_delete = "0",
								tb2.delete_dtm = now()
					WHERE tb1.cart_seq = ${item.cart_seq}
						AND tb2.user_seq = ${item.user_seq}
						AND	tb2.is_delete != "0"`
			);
		}
		return resultPayment[0].insertId;
	} catch (e) {
		console.log(e);
	}
}

async function payOutList(user) {
	
	try {
		const [result] = await dbPool.query(
			`SELECT * 
				FROM tb_payment
			WHERE paymented_dtm BETWEEN DATE_SUB(NOW(), INTERVAL ${user.month} MONTH)
			AND NOW() AND user_seq = ${user.user_seq}
			ORDER BY user_seq DESC`
		);
		
		return result;
	} catch (e) {
		console.error(e);
	}
}

// 주문상세내역
async function payOutDetail(item) {
  
  try {
    const [result] = await dbPool.query(
      `SELECT
        tb1.status, tb5.packaging_type,
        tb1.cart_seq, tb1.cart_total_price, tb1.delivery_price, tb1.payment_price, tb1.total_accumulate_price,
        tb2.payment_seq, tb2.payment_method, tb2.payment_kind, tb2.is_installment, tb2.receiver, tb2.receiver_phone, tb2.receive_place, tb2.door_password, tb2.receive_place_etc, tb2.arrival_message_time, tb2.paymented_dtm,
        tb3.zip_code, tb3.address, tb3.address_detail
      FROM tb_cart tb1
      INNER JOIN tb_payment tb2
      ON tb2.cart_seq = tb1.cart_seq
      LEFT JOIN tb_user_address tb3
      ON tb3.receiver = tb2.receiver
      LEFT JOIN tb_cart_detail tb4
      ON tb4.cart_seq = tb1.cart_seq
      LEFT JOIN tb_product_view tb5
      ON tb5.product_seq = tb4.product_seq
      WHERE tb1.user_seq = ${item.user_seq}
      AND tb1.cart_seq = ${item.cart_seq}
      AND tb1.status NOT IN ('0')
      AND tb2.payment_seq = ${item.payment_seq}`
    );
    console.log("payOutDetail DB : ", result[0]);
    return result[0];
  } catch (e) {
    console.error(e);
  }
}
// 주문상세내역 장바구니담기
async function reorderToCart(item) {
  
  try {
    if (item.cart_seq.length == 1) {
      const [resultCart] = await dbPool.query(
        `INSERT INTO tb_cart(
          user_seq, total_product_count,
          status, cart_total_price, delivery_price,
          total_cart_discount_price, total_accumulate_price,
          payment_price, create_dtm, update_dtm)
        SELECT
          user_seq, total_product_count, "0",
          cart_total_price, delivery_price,
          total_cart_discount_price, total_accumulate_price,
          payment_price, now(), now() FROM tb_cart
        WHERE cart_seq = ${item.cart_seq[0]}`
      );
      
      const [resultCartDetail] = await dbPool.query(
        `INSERT INTO tb_cart_detail(
          product_view_seq, product_seq, user_seq, cart_seq,
          products_buy_count, products_total_price, is_delete,
          delete_dtm, create_dtm, update_dtm)
        SELECT
          product_view_seq, product_seq, user_seq, ${resultCart.insertId},
          products_buy_count, products_total_price, "1",
          NULL, now(), now() FROM tb_cart_detail
        WHERE cart_seq = ${item.cart_seq[0]}`
      );
      return resultCart.insertId;
    } else {
      // 재주문 cart에 insert후 더하기
      const [resultCart] = await dbPool.query(
        `INSERT INTO tb_cart(
          user_seq, total_product_count,
          status, cart_total_price, delivery_price,
          total_cart_discount_price, total_accumulate_price,
          payment_price, create_dtm, update_dtm)
        SELECT
          user_seq, total_product_count, "0",
          cart_total_price, delivery_price,
          total_cart_discount_price, total_accumulate_price,
          payment_price, now(), now()
        FROM tb_cart
        WHERE cart_seq = ${item.cart_seq[0]}`
      );
      for (let i = 1; i < item.cart_seq.length; i++) {
        const [resultAddCart] = await dbPool.query(
          `UPDATE tb_cart SET
            total_product_count = CONVERT(total_product_count, UNSIGNED) +
                                  (SELECT tb1.total_product_count FROM
                                    (SELECT total_product_count
                                       FROM tb_cart
                                      WHERE cart_seq = ${item.cart_seq[i]}) tb1),
            cart_total_price = CONVERT(cart_total_price, UNSIGNED) +
                               (SELECT tb1.cart_total_price FROM
                                 (SELECT cart_total_price
                                    FROM tb_cart
                                   WHERE cart_seq = ${item.cart_seq[i]}) tb1),
            delivery_price = CONVERT(delivery_price, UNSIGNED) +
                              (SELECT tb1.delivery_price FROM
                                (SELECT delivery_price
                                   FROM tb_cart
                                  WHERE cart_seq = ${item.cart_seq[i]}) tb1),
            total_cart_discount_price = CONVERT(total_cart_discount_price, UNSIGNED) +
                                          (SELECT tb1.total_cart_discount_price FROM
                                            (SELECT total_cart_discount_price
                                               FROM tb_cart
                                              WHERE cart_seq = ${item.cart_seq[i]}) tb1),
            total_accumulate_price = CONVERT(total_accumulate_price, UNSIGNED) +
                                      (SELECT tb1.total_accumulate_price FROM
                                        (SELECT total_accumulate_price
                                           FROM tb_cart
                                          WHERE cart_seq = ${item.cart_seq[i]}) tb1),
            payment_price = CONVERT(payment_price, UNSIGNED) +
                              (SELECT tb1.payment_price FROM
                                (SELECT payment_price
                                   FROM tb_cart
                                  WHERE cart_seq = ${item.cart_seq[i]}) tb1)
          WHERE cart_seq IN (${resultCart.insertId})`
        );
      } // 재주문 cart_detail에 상품 추가
      for (let i = 0; i < item.cart_seq.length; i++) {
        const [resultCartDetail] = await dbPool.query(
          `INSERT INTO tb_cart_detail(
            product_view_seq, product_seq, user_seq,
            cart_seq, products_buy_count, products_total_price,
            is_delete, delete_dtm, create_dtm, update_dtm)
          SELECT
            product_view_seq, product_seq, user_seq,
            ${resultCart.insertId}, products_buy_count,
            products_total_price, "1", NULL, now(), now()
          FROM tb_cart_detail
          WHERE cart_seq IN (${item.cart_seq[i]})`
        );
      }
      return resultCart.insertId;
    }
    return;
  } catch (e) {
    console.error(e);
  }
}

module.exports = {
  payOut,
  payOutList,
  payOutDetail,
  reorderToCart,
};
