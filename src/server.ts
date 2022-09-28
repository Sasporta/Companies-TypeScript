import './tracer';
import app from './app';
import config from './config';
import { connectMongoDB } from './config/mongo';
import { connectTypeormWithPostgres } from './config/typeorm';

const {
  env: { port },
} = config;

app.listen(port, async () => {
  await Promise.all([connectTypeormWithPostgres(), connectMongoDB()]);

  console.log('App running on port ', port);
});
