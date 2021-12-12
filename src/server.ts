import * as express from "express";
import { Express } from "express";
import * as mongoose from "mongoose";

import { config } from "./config";

import { authRouter } from "./routes/auth.routes";
import { movieRouter } from "./routes/movie.routes";

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
app.use("/api/auth", authRouter);
app.use("/api/movieslist", movieRouter);

// -- Wake Up Server
const port: number = config["SERVER"].port;
app.listen(port, () => console.log(`Listening on http://localhost:${port}`));
