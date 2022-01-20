import { Request, Response, NextFunction } from 'express';
import { Params, ReclamoParameters } from '@types';

export default function setHeadersMiddleware(
  req: Request<Params, unknown, ReclamoParameters, unknown>,
  res: Response,
  next: NextFunction,
) {
  res.append('Access-Control-Allow-Origin', ['*']);
  res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.append('Access-Control-Allow-Headers', 'Content-Type');

  next();
}
