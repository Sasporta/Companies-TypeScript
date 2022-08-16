import Redis from 'ioredis';

import config from '.';

const {
	redis: { tls, redisUrl },
} = config;

export const redis = new Redis(redisUrl, { tls });
