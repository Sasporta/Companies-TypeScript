import app from './app';
import config from '../../config';
import Mongo from '../../services/Mongo';
import Rabbit from '../../services/rabbitMQ';

const {
  env: { metadataPort },
} = config;

app.listen(metadataPort, async () => {
  try {
    await Promise.all([Mongo.connect(), Rabbit.connect()]);

    Rabbit.consume();

    console.log('Metadata worker running on port ', metadataPort);
  } catch (error) {
    console.error('Error during Metadata initialization ', error);
  }
});
