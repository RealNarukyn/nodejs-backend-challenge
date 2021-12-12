import * as express from "express";
import { Router } from "express";

// My Controller
import { MovieController } from "../controllers/movie.controller";

const router: Router = express.Router();

//-- [ GET Routes ]
router.get("/", MovieController.findAll);
router.get("/:userID", MovieController.findAllByUser);
router.get("/:userID/:listID", MovieController.findBylistID);

//-- [ POST Routes ]
router.post("/", MovieController.create);

//-- [ PUT Routes ]
router.put("/", MovieController.add);

//-- [ DELETE Routes ]
router.delete("/:userID/:listID", MovieController.delete);

export { router as movieRouter };
