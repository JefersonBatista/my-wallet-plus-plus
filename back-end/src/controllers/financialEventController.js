import * as authService from "../services/authService.js";
import * as financialEventService from "../services/financialEventService.js";

export async function register(req, res) {
	const authorization = req.headers.authorization || "";
	const token = authorization.replace("Bearer ", "");

	if (!token) {
		return res.sendStatus(401);
	}

	const user = await authService.identifyUser(token);

	const { value, type } = req.body;

	if (!value || !type) {
		return res.sendStatus(422);
	}

	await financialEventService.register({ userId: user.id, ...req.body });

	res.sendStatus(201);
}

export async function list(req, res) {
	const authorization = req.headers.authorization || "";
	const token = authorization.replace("Bearer ", "");

	if (!token) {
		return res.sendStatus(401);
	}

	const user = await authService.identifyUser(token);

	const events = await financialEventService.list(user.id);

	res.send(events);
}

export async function sum(req, res) {
	const authorization = req.headers.authorization || "";
	const token = authorization.replace("Bearer ", "");

	if (!token) {
		return res.sendStatus(401);
	}

	const user = await authService.identifyUser(token);

	const sum = await financialEventService.sum(user.id);

	res.send({ sum });
}
