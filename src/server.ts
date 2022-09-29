import './tracer';
import app from './app';
import config from './config';
import { connectMongoDB } from './config/mongo';
import { connectRabbitMQ } from './config/rabbit';
import { connectTypeormWithPostgres } from './config/typeorm';

const {
  env: { webPort },
} = config;

app.listen(webPort, async () => {
  await Promise.all([
    connectMongoDB(),
    connectRabbitMQ(),
    connectTypeormWithPostgres(),
  ]);

  console.log('Web app running on port ', webPort);
});
