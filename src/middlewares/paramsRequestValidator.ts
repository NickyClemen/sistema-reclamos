import { Request } from 'express';

import { RequestParams } from '@schemas';
import { MiddlewareParameters, Params, ReclamoParameters } from '@types';

import { objectIsEmpty } from '@utils';
import debuggingLog from '@debug';

import * as errorMessage from '@static/errorMessage.json';

export default function paramsRequestValidator({ req, res, next }:MiddlewareParameters) {
  debuggingLog(`--- [paramsRequestValidator] ---`);

  const { params }:Request<Params, {}, ReclamoParameters, {}> = req;

  if(objectIsEmpty(params)) {
    try {
      const validateParams = RequestParams.validateAsync(params);

      if(validateParams) {
        next();
      } else {
        return res
          .status(422)
          .json({
            message: errorMessage['400']
          });
      }
    } catch(err) {
      debuggingLog(`--- [paramsRequestValidator] --- \n { message: ${ err.message }, \n errorCode: ${ err.code } \n }`);

      return res
        .status(400)
        .json({
          message: errorMessage['400'],
        });
    }
  }
}