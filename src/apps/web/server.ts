import './tracer';
import app from './app';
import config from '../../config';
import Mongo from '../../services/Mongo';
import Redis from '../../services/Redis';
import Rabbit from '../../services/rabbitMQ';
import Postgres from '../../services/Postgres';

const {
  env: { webPort },
} = config;

app.listen(webPort, async () => {
  try {
    await Promise.all([
      Mongo.connect(),
      Postgres.connect(),
      Rabbit.connect(),
      Redis.connect(),
    ]);

    console.log('Web app running on port ', webPort);
  } catch (error) {
    console.error('Error during Web initialization ', error);
  }
});
