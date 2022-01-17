import IReclamo from '@interfaces/IReclamo.interface';
import { Reclamo } from '@schemas';
import { MiddlewareParameters } from '@types';

import { bodyIsEmpty } from '@utils';
import debuggingLog from '@debug';

import * as errorMessage from '@static/errorMessage.json';

export default function bodyRequestValidator({ req, res, next }:MiddlewareParameters) {
  debuggingLog(`--- [bodyRequestValidator] ---`);

  const { body }:IReclamo = req;

  if(bodyIsEmpty(body)) {
    try {
      const validateBody = Reclamo.validateAsync(body);

      if(validateBody) {
        next();
      } else {
        return res
          .status(422)
          .json({
            message: 'Missing parameters.'
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