import * as express from 'express';
import { Router, Request, Response } from 'express';

const router:Router = express.Router()

router.get('/api', (req:Request, res:Response) => res.send('the main api endpoint'))

export { router as mainRouter };