import debuggingLog from '@debug';

import { ExportMiddlewaresParams } from '@types';

import bodyRequestValidator from '@middlewares/bodyRequestValidator';
import paramsRequestValidator from '@middlewares/paramsRequestValidator';
import sessionValidator from '@middlewares/sessionValidator';

const middlewares = {
  body: [
    bodyRequestValidator,
    sessionValidator
  ],
  params: [
    paramsRequestValidator,
    sessionValidator
  ]
}

export default function exportMiddlewares({ prop, middlewareParameters }:ExportMiddlewaresParams):Function[] {
  debuggingLog(`--- [exportMiddlewares] ---`);

  const arrMiddleware = Object.keys(middlewares).filter(key => key === prop);

  return arrMiddleware.map((middleware:Function) => middleware(...middlewareParameters));
}
