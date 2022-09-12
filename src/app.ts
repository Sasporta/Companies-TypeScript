import express from 'express';

import routes from './routes';
import { errorHandler } from './middleware/errorHandling';

const app = express();

app.use(express.json());

app.use('/', routes);

app.use(errorHandler);

export default app;
