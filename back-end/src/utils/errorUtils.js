export function conflictError() {
	return {
		type: "conflict",
	};
}

export function unprocessableEntityError() {
	return {
		type: "unprocessable_entity",
	};
}

export function unauthorizedError() {
	return {
		type: "unauthorized",
	};
}
