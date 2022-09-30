import './tracer';
import app from './app';
import config from '../../config';
import Mongo from '../../services/Mongo';
import Rabbit from '../../services/rabbitMQ';
import Postgres from '../../services/Postgres';

const {
  env: { webPort },
} = config;

app.listen(webPort, async () => {
  await Promise.all([Mongo.connect(), Rabbit.connect(), Postgres.connect()]);

  console.log('Web app running on port ', webPort);
});
