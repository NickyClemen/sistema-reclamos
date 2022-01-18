import { NextFunction, Request } from 'express';

import { RequestParams } from '@schemas';
import { Params, ReclamoParameters } from '@types';

import { objectIsEmpty } from '@utils';
import debuggingLog from '@debug';

import * as errorMessage from '@static/errorMessage.json';

export default function paramsRequestValidator(
  req: Request<Params, unknown, ReclamoParameters, unknown>,
  res: Response,
  next: NextFunction
) {
  debuggingLog(`--- [paramsRequestValidator] ---`);

  const { params }: Request<Params, unknown, ReclamoParameters, unknown> = req;

  if (objectIsEmpty(params)) {
    try {
      const validateParams: Promise<typeof RequestParams> = RequestParams.validateAsync(params);

      if (validateParams) {
        next();
      } else {
        return res.status(422).json({
          message: errorMessage['400'],
        });
      }
    } catch (err: unknown) {
      const error = err as Error;
      debuggingLog(`--- [paramsRequestValidator] --- \n { message: ${ error.message }, \n }`);

      return res.status(400).json({
        message: errorMessage['400'],
      });
    }
  }
}
