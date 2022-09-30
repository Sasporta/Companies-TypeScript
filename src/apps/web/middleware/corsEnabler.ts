import { RouteHandler } from '../../../types/global';

export const corsEnabler: RouteHandler = (req, res, next) => {

  res.append('Access-Control-Allow-Origin', 'http://localhost:3000');

  res.append(
    'Access-Control-Allow-Methods',
    'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  );

  res.append('Access-Control-Allow-Headers', 'Content-Type');

  next();
};
