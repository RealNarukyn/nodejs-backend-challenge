import * as dotenv from "dotenv";
dotenv.config();

const MONGO_HOST =
  process.env.MONGO_HOST || "mongodb://localhost:27017/docfarma";
const MONGO = { host: MONGO_HOST };

const PORT: number = parseInt(process.env.PORT) || 3000;
const SERVER = { port: PORT };

export const config = {
  SERVER,
  MONGO,
};
