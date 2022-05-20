import express from 'express';
import bodyParser from 'body-parser';
import swaggerUI from 'swagger-ui-express';

import routes from './routes';
import swaggerDocs from './swagger/docs';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/', routes);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

export default app;
