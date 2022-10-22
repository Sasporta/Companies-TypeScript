import Redis from 'ioredis';

import config from '../config';
import { Entity } from '../types/global';
import { CompanyEntity } from '../entities/Company';
import { EmployeeEntity } from '../entities/Employee';

type Entities = CompanyEntity[] & EmployeeEntity[];

type GetFn = (key: string) => Promise<(Entity & Entities) | null>;

type RemoveFn = (key: string) => Promise<void>;

type RemoveAllFn = (pattern: string) => Promise<void>;

type SetFn = <T>(key: string, value: T) => Promise<void>;

const {
  redis: { tls, redisUrl },
} = config;

class redis {
  instance: Redis.Redis;

  connect = () => {
    try {
      this.instance = new Redis(redisUrl, { tls });

      console.log('Redis has been connected!');
    } catch (error) {
      console.error('Error during Redis connection ', error);
    }
  };

  disconnect = () => this.instance.disconnect();

  get: GetFn = async key => {
    const result = await this.instance.get(key);

    return JSON.parse(result);
  };

  set: SetFn = async (key, value) => {
    await this.instance.set(key, JSON.stringify(value), 'ex', 691200000);
  };

  remove: RemoveFn = async key => {
    await this.instance.del(key);
  };

  removeAll: RemoveAllFn = async pattern => {
    const stream = this.instance.scanStream({ match: pattern + '*' });

    stream.on('data', (keys: string[]) => {
      if (keys.length) {
        const pipeline = this.instance.pipeline();

        keys.forEach(key => pipeline.del(key));

        pipeline.exec();
      }
    });
  };
}

export default new redis();
