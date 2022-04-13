import * as financialEventService from "../services/financialEventService.js";

export async function register(req, res) {
	const { user } = res.locals;

	const { value, type } = req.body;

	if (!value || !type) {
		return res.sendStatus(422);
	}

	await financialEventService.register({ userId: user.id, ...req.body });

	res.sendStatus(201);
}

export async function list(req, res) {
	const { user } = res.locals;

	const events = await financialEventService.list(user.id);

	res.send(events);
}

export async function sum(req, res) {
	const { user } = res.locals;

	const sum = await financialEventService.sum(user.id);

	res.send({ sum });
}
