import { Request, Response, NextFunction } from 'express';

import { RequestParams } from '@schemas';
import { Params, ReclamoParameters } from '@types';

import { objectIsEmpty } from '@utils';
import debuggingLog from '@debug';

export default async function paramsRequestValidator(
  req: Request<Params, unknown, ReclamoParameters, unknown>,
  res: Response,
  next: NextFunction,
) {
  debuggingLog('[paramsRequestValidator]', 'init');

  const { params }: Request<Params, unknown, ReclamoParameters, unknown> = req;
  debuggingLog('[paramsRequestValidator]', JSON.stringify(params));

  if (objectIsEmpty(params)) {
    try {
      const validateParams = await RequestParams.validateAsync(params);

      if (objectIsEmpty(validateParams)) {
        next();
      }
    } catch (err: unknown) {
      const error = err as Error;
      debuggingLog('[paramsRequestValidatorError]', JSON.stringify(error));

      next(error);
    }
  }
}
