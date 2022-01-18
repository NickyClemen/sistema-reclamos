import { Request, Response, NextFunction } from 'express';

import { Params, ReclamoParameters } from '@types';

export default function sessionValidator(
  req: Request<Params, unknown, ReclamoParameters, unknown>,
  res: Response,
  next: NextFunction
) {}
