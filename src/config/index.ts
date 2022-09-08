import dotenv from 'dotenv';

dotenv.config();

const { env } = process;

const secureConnection =
  env.NODE_ENV === 'production' || env.LOAD_TEST === 'true'
    ? { rejectUnauthorized: false }
    : false;

export default {
  env: {
    port: env.PORT || 3000,
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
    tls: secureConnection,
    redisUrl: env.REDIS_TLS_URL,
  },
};
