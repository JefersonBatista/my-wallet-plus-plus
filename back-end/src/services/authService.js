import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import connection from "../database.js";
import { conflictError, unauthorizedError } from "../utils/errorUtils.js";

export async function signUp({ name, email, password }) {
	const existingUsers = await connection.query(
		`SELECT * FROM "users" WHERE "email"=$1`,
		[email]
	);

	if (existingUsers.rowCount > 0) {
		throw conflictError();
	}

	const hashedPassword = bcrypt.hashSync(password, 12);

	await connection.query(
		`INSERT INTO "users" ("name", "email", "password") VALUES ($1, $2, $3)`,
		[name, email, hashedPassword]
	);
}

export async function signIn({ email, password }) {
	const { rows } = await connection.query(
		`SELECT * FROM "users" WHERE "email"=$1`,
		[email]
	);
	const [user] = rows;

	if (!user || !bcrypt.compareSync(password, user.password)) {
		throw unauthorizedError();
	}

	const token = jwt.sign(
		{
			id: user.id,
		},
		process.env.JWT_SECRET
	);

	return token;
}

export async function identifyUser(token) {
	try {
		const user = jwt.verify(token, process.env.JWT_SECRET);
		return user;
	} catch {
		throw unauthorizedError();
	}
}
