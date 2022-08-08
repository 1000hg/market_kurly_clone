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

module.exports = {
	resetPw,
	checkedUser,
};
