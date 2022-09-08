import { redis } from '../config/redis';
import { entities } from '../types/global';

export default class Redis {
  static get = async (key: string) => {
    const result = await redis.get(key);

    return JSON.parse(result);
  };

  static set = async (key: string, value: entities) => {
    await redis.set(key, JSON.stringify(value), 'ex', 691200000);
  };

  static remove = async (key: string) => {
    await redis.del(key);
  };

  static removeAll = async (pattern: string) => {
    const stream = redis.scanStream({ match: pattern + '*' });

    stream.on('data', (keys: string[]) => {
      if (keys.length) {
        const pipeline = redis.pipeline();

        keys.forEach(key => pipeline.del(key));

        pipeline.exec();
      }
    });
  };
}
