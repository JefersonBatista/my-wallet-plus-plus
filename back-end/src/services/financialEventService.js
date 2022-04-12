import { unprocessableEntityError } from "../utils/errorUtils.js";
import * as financialEventRepository from "../repositories/financialEventRepository.js";

export async function register({ userId, value, type }) {
	const financialTypes = ["INCOME", "OUTCOME"];
	if (!financialTypes.includes(type)) {
		throw unprocessableEntityError();
	}

	if (value < 0) {
		throw unprocessableEntityError();
	}

	await financialEventRepository.insert({ userId, value, type });
}

export async function list(userId) {
	const events = await financialEventRepository.getAllByUser(userId);

	return events;
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
