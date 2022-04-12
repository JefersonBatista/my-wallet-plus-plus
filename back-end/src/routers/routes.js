import { Router } from "express";

import authRouter from "./authRouter.js";
import financialEventRouter from "./financialEventRouter.js";

const routes = Router();

routes.use(authRouter);
routes.use(financialEventRouter);

export default routes;
