import express from 'express';

import middleware from './middleware';

const app = express();

app.use(...middleware);

export default app;
