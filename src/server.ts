import * as express from 'express';
import { Express } from 'express';

import { mainRouter } from './routes/main.routes';

const app:Express = express();

// -- Middlewares
app.use(express.json());

// -- Routes
app.use(mainRouter);

// -- Wake Server
const port:number = 3000;
app.listen(port, () => console.log(`Listening on http://localhost:${port}`));