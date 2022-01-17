import { Request } from 'express';

import { Reclamo } from '@schemas';
import { MiddlewareParameters, Params, ReclamoParameters } from '@types';

import { objectIsEmpty } from '@utils';
import debuggingLog from '@debug';

import * as errorMessage from '@static/errorMessage.json';

export default function bodyRequestValidator({ req, res, next }:MiddlewareParameters) {
  debuggingLog(`--- [bodyRequestValidator] ---`);

  const { body }:Request<Params, {}, ReclamoParameters, {}> = req;

  if(objectIsEmpty(body)) {
    try {
      const validateBody = Reclamo.validateAsync(body);

      if(validateBody) {
        next();
      } else {
        return res
          .status(422)
          .json({
            message: errorMessage['400']
          });
      }
    } catch(err) {
      debuggingLog(`--- [bodyRequestValidator] --- \n { message: ${ err.message }, \n errorCode: ${ err.code } \n }`);

      return res
        .status(400)
        .json({
          message: errorMessage['400'],
        });
    }
  }
}