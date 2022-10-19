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

module.exports = {
	payOut,
	payOutList,
};
