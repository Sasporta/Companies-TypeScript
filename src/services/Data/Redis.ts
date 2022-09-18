import { redis } from '../../config/redis';
import { Entity } from '../../types/global';
import { Company } from '../../entities/Company';
import { Employee } from '../../entities/Employee';

type Entities = Company[] & Employee[];

type GetFn = (key: string) => Promise<Entity & Entities | null>;

type RemoveFn = (key: string) => Promise<void>;

type RemoveAllFn = (pattern: string) => Promise<void>;

type SetFn = <T>(key: string, value: T) => Promise<void>;

class Redis {
  get: GetFn = async key => {
    const result = await redis.get(key);

    return JSON.parse(result);
  };

  set: SetFn = async (key, value) => {
    await redis.set(key, JSON.stringify(value), 'ex', 691200000);
  };

  remove: RemoveFn = async key => {
    await redis.del(key);
  };

  removeAll: RemoveAllFn = async pattern => {
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

export default new Redis();
