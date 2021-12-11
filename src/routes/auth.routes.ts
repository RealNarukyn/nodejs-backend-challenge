import * as express from "express";
import { Router } from "express";

// My Controller
import { AuthController } from "../controllers/auth.controllers";

const router: Router = express.Router();

router.post("/api/login", AuthController.login);
router.post("/api/register", AuthController.register);

export { router as authRouter };
