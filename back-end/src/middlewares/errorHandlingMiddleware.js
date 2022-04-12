export default function errorHandling(error, req, res, next) {
	if (error.type === "conflict") return res.sendStatus(409);
	if (error.type === "unprocessable_entity") return res.sendStatus(422);
	if (error.type === "unauthorized") return res.sendStatus(401);

	console.error(error);
	return res.sendStatus(500);
}
