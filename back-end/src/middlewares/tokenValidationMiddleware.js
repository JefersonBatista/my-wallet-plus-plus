import * as authService from "../services/authService.js";

export default function validateToken(req, res, next) {
  const authorization = req.headers.authorization || "";
	const token = authorization.replace("Bearer ", "");

	if (!token) {
		return res.sendStatus(401);
	}

	const user = await authService.identifyUser(token);
  res.locals.user = user;

  return next();
}
