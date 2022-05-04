import dotenv from 'dotenv';

export const node_env = process.env.NODE_ENV || 'dev';

dotenv.config({ path: `./.env.${node_env}` });
