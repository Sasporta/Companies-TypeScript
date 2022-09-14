import express from 'express';

import routes from './routes';
import customMiddleware from './middleware';

const app = express();

app.use(express.json());

app.use('/', routes);

app.use(...customMiddleware);

export default app;
