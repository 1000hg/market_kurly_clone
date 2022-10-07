const mysql2 = require("mysql2/promise");
const dotenv = require("dotenv");
dotenv.config();

const dbPool = mysql2.createPool({
	host: process.env.DB_HOST,
	// port: process.env.DB_PORT,
	user: process.env.DB_USER,
	password: process.env.DB_PW,
	database: "market-kurly-clone",
	dateStrings: "date",
	connectionLimit: 10,
	waitForConnections: true,
});

async function resetPw(user) {
	
	try {
		const result = await dbPool.query(
			`UPDATE tb_user 
      SET user_password = "${user.user_password}" 
      WHERE user_id = "${user.user_id}"`
		);
		// 수정한 정보반환
		return result[0].info;
	} catch (error) {
		console.error(error);
	}
}

async function checkedUser(user) {
	
	if (Object.values(user)[0].length < 6) {
		return { message: "사용 할 수 없습니다." };
	} else {
		try {
			const result = await dbPool.query(
				`SELECT * 
        FROM tb_user
        WHERE ${Object.keys(user)[0]} = "${Object.values(user)[0]}"`
			);
			if (result[0].length == 0) {
				return { message: "사용 할 수 있습니다." };
			} else {
				return { message: "사용 할 수 없습니다." };
			}
		} catch (error) {
			console.error(error);
		}
	}
}

async function checkedUserPassword(user) {
	
	try {
		const result = await dbPool.query(
			`SELECT * 
      FROM tb_user 
      WHERE ${Object.keys(user)[0]} = "${Object.values(user)[0]}" 
      AND ${Object.keys(user)[1]} = "${Object.values(user)[1]}"`
		);
		
		// DB에서 가져온 회원데이터에 메시지 넣기
		if (Object.keys(user)[0] == "user_name") {
			result[0][0].message = "아이디로 로그인하세요!";
			return result[0][0];
		} else {
			result[0][0].message = "새로운 비밀빈호를 입력하세요!";
			return result[0][0];
		}
	} catch (error) {
		console.error(error);
	}
}

async function findByAddress(user) {
	
	try {
		const result = await dbPool.query(
			`SELECT *
			FROM tb_user JOIN tb_user_address
			ON tb_user.user_seq = tb_user_address.user_seq
			WHERE tb_user.user_id = "${user.user_id}"`
		);
		
		return result[0];
	} catch (error) {
		console.error(error);
	}
}

async function addUserAddress(user) {
	try {
		if (user.default_address == 1) {
			try {
				const result = dbPool.query(
					`UPDATE tb_user_address
					SET default_address = 0
					WHERE user_seq = "${user.user_seq}"`
				);
			} catch(error) {
				console.error(error);
			}
		}

		const result = await dbPool.query(
			`INSERT INTO tb_user_address SET
		      user_seq=?,
		      zip_code=?,
		      address=?,
		      address_detail=?,
		      default_address=?,
					create_dtm=?,
		      update_dtm=?`,
			[
				user.user_seq,
				user.zip_code,
				user.address,
				user.address_detail,
				user.default_address,
				new Date(),
				new Date(),
			]
		);

		return result[0].insertId;
	} catch (error) {
		console.error(error);
	}
}

async function delAddress(adr) {
	try {
		const result = await dbPool.query(
			`DELETE FROM tb_user_address
			WHERE user_address_seq = "${adr.seq}"`
		);
		return result[0].affectedRows;
	} catch(e) {
		console.error(e);
	}
}

async function updateAddress(adr) {
	try {
		if (adr.default_address == 1) {
			const [resultDefaultAddress] = await dbPool.query(
				`UPDATE tb_user_address SET
					default_address = 0
				WHERE user_seq = ${adr.user_seq}`
			)
		}
		const [result] = await dbPool.query(
			`UPDATE tb_user_address SET
				address_detail = "${adr.address_detail}",
				default_address = "${adr.default_address}",
				receiver = "${adr.receiver}",
				receiver_phone = "${adr.receiver_phone}",
				update_dtm = now()
			WHERE user_seq = ${adr.user_seq}
			AND user_address_seq = ${adr.user_address_seq}`
		);
		return result.info;
	} catch (e) {
		console.error(e);
	}
}

module.exports = {
	resetPw,
	checkedUser,
	checkedUserPassword,
	findByAddress,
	addUserAddress,
	delAddress,
	updateAddress
};