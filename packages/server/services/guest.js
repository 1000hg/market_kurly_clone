const dbPool = require("../db");
// guest_seq 생성
async function createGuest(item) {
	try {
		const [insertGuest] = await dbPool.query(
			`INSERT INTO tb_guest SET
        create_dtm = now();`
		);
		return insertGuest.insertId;
	} catch (e) {
		console.error(e);
	}
}

async function guestProduct(item) {
	try {
		// quest_cart 생성
		const [insertCart] = await dbPool.query(
			`INSERT INTO tb_guest_cart (
				guest_seq, 
				product_seq, 
				product_view_seq, 
				product_buy_count, 
				create_dtm)
			SELECT 
			  ${item.guest_seq}, 
				${item.product_seq}, 
				${item.product_view_seq}, 
				'${item.product_buy_count}', 
				now() 
			FROM DUAL WHERE NOT EXISTS (
				 SELECT * 
					 FROM tb_guest_cart 
				  WHERE guest_seq = ${item.guest_seq} 
					  AND product_seq = ${item.product_seq});`
		);

		if (insertCart.insertId) {
			return insertCart.insertId;
		} else {
			// guest_cart 기존 상품 수량 업데이트
			const [updateCart] = await dbPool.query(
				`UPDATE tb_guest_cart SET
					product_buy_count = CONVERT(product_buy_count, UNSIGNED) + ${parseInt(
						item.product_buy_count
					)},
					update_dtm = now()
				WHERE guest_seq = ${item.guest_seq}
				AND product_seq = ${item.product_seq}`
			);

			return updateCart;
		}
	} catch (e) {
		console.error(e);
	}
}

async function insertToCart(item) {
	
	try {
		const guestSeq = !item.guest_seq ? await createGuest(item) : item.guest_seq;
		item.guest_seq = guestSeq;
		const productSeq = await guestProduct(item);
		return { guest_seq: guestSeq, product_seq: productSeq.info };
	} catch (e) {
		console.log(e);
	}
}

async function getCartList(guest) {
	
	try {
		const result = await dbPool.query(
			`SELECT 
				tb1.guest_cart_seq, tb2.product_seq, 
				tb2.product_status, tb2.product_name, tb2.product_price, tb1.product_buy_count,
				tb2.product_stock, tb3.product_view_seq, tb3.product_view_title, tb3.vender,
				tb3.packaging_type, tb4.product_img_seq, tb4.product_img
			FROM tb_guest_cart tb1
			INNER JOIN tb_product tb2
			ON tb1.product_seq = tb2.product_seq
			LEFT JOIN tb_product_view tb3
			ON tb2.product_seq = tb3.product_seq			
			LEFT JOIN tb_product_img tb4
			ON tb2.product_seq = tb4.product_seq
			WHERE tb1.guest_seq = "${guest.guest_seq}"
			AND tb2.product_status = "1"
			AND tb3.product_view_status = "1"
			AND tb4.product_img_type = "0"`
		);
		
		return result[0];
	} catch (e) {
		console.log(e);
	}
}
// 장바구니에 상품종류 가져오기
async function getCartCount(guest) {
	const [resultCartCount] = await dbPool.query(
		`SELECT 
			COUNT(guest_seq) AS cart_count
		FROM tb_guest_cart
		WHERE guest_seq = ${guest.guest_seq}`
	);
	// console.log("<><><>", resultCartCount[0]);
	return resultCartCount[0].cart_count;
}
// 장바구니에서 수량 증가감소
async function updateToCart(item) {
	
	try {
		const result = await dbPool.query(
			`UPDATE tb_guest_cart	SET 
				product_buy_count = "${item.products_buy_count}",
				update_dtm = now()
			WHERE guest_cart_seq = ${item.guest_cart_seq}
				AND guest_seq = ${item.guest_seq}
				AND product_seq = ${item.product_seq}`
		);
	
		return result[0].info;
	} catch (e) {
		console.log(e);
	}
}

async function deleteCart(items) {
	
	const len = items.guest_cart_seq.length;
	let productCount = 0;
	try {
		for await (const seq of items.guest_cart_seq) {
			[productCount] = await dbPool.query(
				`SELECT 
					COUNT(guest_seq) AS cart_count
				FROM tb_guest_cart
				WHERE guest_seq = ${items.guest_seq}`
			);
		}
		
		if (len == productCount[0].cart_count) {
			const result = await dbPool.query(
				`DELETE tb1, tb2
				FROM tb_guest tb1
				LEFT JOIN tb_guest_cart tb2
				ON tb1.guest_seq = tb2.guest_seq
				WHERE tb2.guest_seq = "${items.guest_seq}"`
			);
			
			return result[0].affectedRows;
		} else {
			const result = await dbPool.query(
				`DELETE FROM tb_guest_cart
				WHERE guest_seq = "${items.guest_seq}"
				AND guest_cart_seq = "${items.guest_cart_seq}"
				AND product_seq = "${items.product_seq}"`
			);
			
			return result[0].affectedRows;
		}
	} catch (e) {
		console.log(e);
	}
}

module.exports = {
	insertToCart,
	getCartList,
	getCartCount,
	updateToCart,
	deleteCart,
};
