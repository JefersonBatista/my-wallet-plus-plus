import cors from "cors";
import express from "express";

import routes from "./routers/routes.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(routes);

export default app;
