import { Request, Response, NextFunction } from 'express';

import { ActualizacionReclamo } from '@schemas';
import { Params, ReclamoParameters } from '@types';

import debuggingLog from '@debug';

import { objectIsEmpty } from '@utils';

export default async function bodyPutRequestValidator(
  req: Request<Params, unknown, ReclamoParameters, unknown>,
  res: Response,
  next: NextFunction,
): Promise<void> {
  debuggingLog(`[bodyPutRequestValidator]`, 'init');

  const { body }: Request<Params, unknown, ReclamoParameters, unknown> = req;
  debuggingLog(`[bodyPutRequestValidator]:body`, JSON.stringify(body));

  try {
    const validateResult: Promise<any> = await ActualizacionReclamo.validateAsync(body);
    debuggingLog(`[bodyPutRequestValidator]:validateResult`, JSON.stringify(validateResult));

    if (objectIsEmpty(validateResult)) {
      next();
    }
  } catch (err: unknown) {
    const error = err as Error;
    next(error);
  }
}
