import amqp from 'amqplib';

import config from '../config';
import Metadata from './Metadata';

const {
  rabbit: { metadataUpdateQueue, rabbitUrl },
} = config;

class RabbitMQ {
  channel: amqp.Channel;
  connection: amqp.Connection;

  connect = async () => {
    try {
      this.connection = await amqp.connect(rabbitUrl);

      this.channel = await this.connection.createChannel();

      await this.channel.assertQueue(metadataUpdateQueue, { durable: true });

      console.log('RabbitMQ has been connected!');

      return this;
    } catch (error) {
      console.error('Error during RabbitMQ connection ', error);
    }
  };

  disconnect = async () => {
    await this.channel.close();
    await this.connection.close();
  };

  async send(data: object) {
    try {
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
      this.channel.consume(metadataUpdateQueue, async data => {
        const message = JSON.parse(data.content.toString());

        switch (message.action) {
        case 'create':
          await Metadata.createCount(message);
          break;
        case 'update':
          await Metadata.updateCounts(message);
          break;
        case 'delete':
          await Metadata.deleteCount(message);
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
