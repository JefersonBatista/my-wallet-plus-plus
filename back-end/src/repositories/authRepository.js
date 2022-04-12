import connection from "../database.js";

export async function findUserByEmail(email) {
	const result = await connection.query(
		`SELECT * FROM "users" WHERE "email"=$1`,
		[email]
	);

	if (result.rowCount === 0) {
		return null;
	}

	const [user] = result.rows;

	return user;
}

export async function createUser({ name, email, hashedPassword }) {
	await connection.query(
		`INSERT INTO "users" ("name", "email", "password") VALUES ($1, $2, $3)`,
		[name, email, hashedPassword]
	);
}
