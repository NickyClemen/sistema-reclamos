import { Request, Response, NextFunction } from 'express';

import { Reclamo } from '@schemas';
import { Params, ReclamoParameters } from '@types';

import debuggingLog from '@debug';

import { objectIsEmpty } from '@utils';

export default async function bodyRequestValidator(
  req: Request<Params, unknown, ReclamoParameters, unknown>,
  res: Response,
  next: NextFunction,
): Promise<void> {
  debuggingLog(`[bodyRequestValidator]`, 'init');

  const { body }: Request<Params, unknown, ReclamoParameters, unknown> = req;
  debuggingLog(`[bodyRequestValidator]:body`, JSON.stringify(body));

  try {
    const validateResult: Promise<any> = await Reclamo.validateAsync(body);
    debuggingLog(`[bodyRequestValidator]:validateResult`, JSON.stringify(validateResult));

    if (objectIsEmpty(validateResult)) {
      next();
    }
  } catch (err: unknown) {
    const error = err as Error;
    next(error);
  }
}
