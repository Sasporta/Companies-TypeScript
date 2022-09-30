import dotenv from 'dotenv';
import { RedisOptions } from 'ioredis';

dotenv.config();

const { env } = process;

const secureConnection =
  env.NODE_ENV === 'production' || env.LOAD_TEST === 'true'
    ? { rejectUnauthorized: false }
    : false;

export default {
  cors: {
    allowedOrigins: ['http://localhost:3000'],
  },
  env: {
    webPort: env.WRB_PORT || 8000,
    metadataPort: env.METADATA_PORT || 8001,
  },
  postgres: {
    host: env.HOST,
    ssl: secureConnection,
    port: +env.POSTGRES_PORT,
    database: env.POSTGRES_DB,
    username: env.POSTGRES_USER,
    postgresUrl: env.DATABASE_URL,
    password: env.POSTGRES_PASSWORD,
    loadTestSeeding: env.LOAD_TEST_SEEDING === 'true',
  },
  redis: {
    tls: secureConnection as RedisOptions,
    redisUrl: env.REDIS_TLS_URL,
  },
  mongo: {
    mongoUrl: env.MONGO_URL,
  },
  rabbit: {
    rabbitUrl: env.RABBIT_URL,
    metadataUpdateQueue: 'metadataUpdateQueue',
  },
};
