import amqp from 'amqplib';

import config from '../config';
import MetadataService from './Metadata';

const {
  rabbit: { metadataUpdateQueue, rabbitUrl },
} = config;

class RabbitMQ {
  channel: amqp.Channel;
  connection: amqp.Connection;

  async connect() {
    try {
      this.connection = await amqp.connect(rabbitUrl);

      this.channel = await this.connection.createChannel();

      console.log('RabbitMQ has been connected!');

      return this;
    } catch (error) {
      console.error('Error during RabbitMQ connection ', error);
    }
  }

  async send(data: object) {
    try {
      await this.channel.assertQueue(metadataUpdateQueue, { durable: true });

      this.channel.sendToQueue(
        metadataUpdateQueue,
        Buffer.from(JSON.stringify(data)),
      );
    } catch (error) {
      console.log(
        `error while sending messages to ${metadataUpdateQueue}: ` + error,
      );
    }
  }

  async consume() {
    try {
      await this.channel.assertQueue(metadataUpdateQueue, { durable: true });

      this.channel.consume(metadataUpdateQueue, async data => {
        const message = JSON.parse(JSON.stringify(data.content));

        switch (message.action) {
        case 'create':
          await MetadataService.createCount(message);
          break;
        case 'update':
          await MetadataService.updateCounts(message);
          break;
        case 'delete':
          await MetadataService.deleteCount(message);
          break;
        }

        this.channel.ack(data);
      });
    } catch (error) {
      console.log(
        `error while consuming messages to ${metadataUpdateQueue}: ` + error,
      );
    }
  }
}

export default new RabbitMQ();
