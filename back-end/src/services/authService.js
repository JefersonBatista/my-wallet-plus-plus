import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { conflictError, unauthorizedError } from "../utils/errorUtils.js";
import * as authRepository from "../repositories/authRepository.js";

export async function signUp({ name, email, password }) {
	const existingUser = await authRepository.findUserByEmail(email);

	if (existingUser) {
		throw conflictError();
	}

	const hashedPassword = bcrypt.hashSync(password, 12);

	await authRepository.createUser({ name, email, hashedPassword });
}

export async function signIn({ email, password }) {
	const user = await authRepository.findUserByEmail(email);

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

export function identifyUser(token) {
	try {
		const user = jwt.verify(token, process.env.JWT_SECRET);
		return user;
	} catch {
		throw unauthorizedError();
	}
}
