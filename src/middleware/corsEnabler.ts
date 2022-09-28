import config from '../config';
import { RouteHandler } from '../types/global';

const {
  cors: { allowedOrigins },
} = config;

export const corsEnabler: RouteHandler = (req, res, next) => {
  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
    res.append('Access-Control-Allow-Origin', origin);
  }

  res.append(
    'Access-Control-Allow-Methods',
    'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  );

  res.append('Access-Control-Allow-Headers', 'Content-Type');

  next();
};
