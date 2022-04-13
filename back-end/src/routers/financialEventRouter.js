import { Router } from "express";

import * as financialEventController from "../controllers/financialEventController.js";
import validateToken from "../middlewares/tokenValidationMiddleware.js";

const financialEventRouter = Router();

financialEventRouter.use(validateToken);

financialEventRouter.post(
	"/financial-events",
	financialEventController.register
);

financialEventRouter.get("/financial-events", financialEventController.list);

financialEventRouter.get("/financial-events/sum", financialEventController.sum);

export default financialEventRouter;
