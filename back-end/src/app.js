import cors from "cors";
import express from "express";
import "express-async-errors";

import routes from "./routers/routes.js";
import errorHandling from "./middlewares/errorHandlingMiddleware.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(routes);
app.use(errorHandling);

export default app;
