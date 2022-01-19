import { Request, Response, NextFunction } from 'express';

import { Reclamo } from '@schemas';
import { Params, ReclamoParameters } from '@types';

import { objectIsEmpty } from '@utils';
import debuggingLog from '@debug';

import * as errorMessage from '@static/errorMessage.json';

export default function bodyRequestValidator(
  req: Request<Params, unknown, ReclamoParameters, unknown>,
  res: Response,
  next: NextFunction,
): void {
  debuggingLog(`--- [bodyRequestValidator] ---`);

  const { body }: Request<Params, unknown, ReclamoParameters, unknown> = req;

  if (objectIsEmpty(body)) {
    try {
      const validateBody = Reclamo.validate(body);

      if (validateBody) {
        next();
      } else {
        res.status(422).json({
          message: errorMessage['400'],
        });
      }
    } catch (err: unknown) {
      const { message } = err as Error;
      debuggingLog(`--- [bodyRequestValidator] --- \n { message: ${message}, \n }`);

      res.status(400).json({
        message: errorMessage['400'],
      });
    }
  }
}
