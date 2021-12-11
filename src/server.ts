import * as express from "express";
import { Express } from "express";
import * as mongoose from "mongoose";

import { config } from "./config";

import { mainRouter } from "./routes/main.routes";
import { authRouter } from "./routes/auth.routes";

const app: Express = express();

// -- Middlewares
app.use(express.json());

// -- Connect to DB
mongoose
  .connect(config["MONGO"].host)
  .then(() => console.log("Connected to mongoDB!"))
  .catch((err) => {
    throw new Error(err);
  });

// -- Routes
app.use(mainRouter);
app.use(authRouter);

// -- Wake Server
const port: number = config["SERVER"].port;
app.listen(port, () => console.log(`Listening on http://localhost:${port}`));
