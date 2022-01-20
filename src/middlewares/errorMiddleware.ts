import { Request, Response, NextFunction } from 'express';

import { Params, ReclamoParameters } from '@types';

import debuggingLog from '@debug';

export default function errorHandler(
  err: Error,
  req: Request<Params, unknown, ReclamoParameters, unknown>,
  res: Response,
  next: NextFunction,
) {
  debuggingLog(`[errorHandler]`, 'init');
  debuggingLog(`[errorHandler:req]`, JSON.stringify(err));

  const { name, message } = err;

  res.status(500).json({ name, message });
}
