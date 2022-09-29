import amqp from 'amqplib';

import config from '.';

const {
  rabbit: { metadataUpdateQueue, rabbitUrl },
} = config;

export const connectRabbitMQ = async () => {
  try {
    const connection = await amqp.connect(rabbitUrl);

    const channel = await connection.createChannel();

    await channel.assertQueue(metadataUpdateQueue);

    console.log('RabbitMQ has been connected!');
  } catch (error) {
    console.error('Error during RabbitMQ connection ', error);
  }
};
