import dotenv from 'dotenv';

dotenv.config();

export default {
  env: {
    port: process.env.PORT || 3000,
  },
  db: {
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
};
