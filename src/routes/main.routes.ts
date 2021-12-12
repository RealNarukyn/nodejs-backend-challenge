import * as express from "express";
import { Router, Request, Response } from "express";

const router: Router = express.Router();

router.get("/", (req: Request, res: Response) =>
  res.send("Main Home Page, There' nothing to see here!")
);

export { router as mainRouter };
