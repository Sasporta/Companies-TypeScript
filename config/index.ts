import dotenv from 'dotenv';

dotenv.config();

export default {
  env: {
    port: process.env.PORT || 3000,
  },
  db: {
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
  },
};
