import './tracer';
import app from './app';
import config from './config';
import { connectMongoDB } from './config/mongo';
import { connectRabbitMQ } from './config/rabbit';
import { connectTypeormWithPostgres } from './config/typeorm';

const {
  env: { port },
} = config;

app.listen(port, async () => {
  await Promise.all([
    connectMongoDB(),
    connectRabbitMQ(),
    connectTypeormWithPostgres(),
  ]);

  console.log('App running on port ', port);
});
