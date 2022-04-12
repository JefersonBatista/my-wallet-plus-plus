import connection from "../database.js";
import { unprocessableEntityError } from "../utils/errorUtils.js";

export async function register({ userId, value, type }) {
	const financialTypes = ["INCOME", "OUTCOME"];
	if (!financialTypes.includes(type)) {
		throw unprocessableEntityError();
	}

	if (value < 0) {
		throw unprocessableEntityError();
	}

	await connection.query(
		`INSERT INTO "financialEvents" ("userId", "value", "type") VALUES ($1, $2, $3)`,
		[userId, value, type]
	);
}

export async function list(userId) {
	const result = await connection.query(
		`SELECT * FROM "financialEvents" WHERE "userId"=$1 ORDER BY "id" DESC`,
		[userId]
	);

	return result.rows;
}

export async function sum(userId) {
	const events = await list(userId);

	const sum = events.reduce(
		(total, event) =>
			event.type === "INCOME" ? total + event.value : total - event.value,
		0
	);

	return sum;
}
