import app from './app';
import config from '../../config';
import { connectMongoDB } from '../../config/mongo';
import { connectRabbitMQ } from '../../config/rabbit';

const {
  env: { metadataPort },
} = config;

app.listen(metadataPort, async () => {
  await Promise.all([connectMongoDB(), connectRabbitMQ()]);

  console.log('Metadata worker running on port ', metadataPort);
});

export default app;
