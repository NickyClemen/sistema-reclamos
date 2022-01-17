import { ExportMiddlewaresParams } from '@types';

import bodyRequestValidator from '@middlewares/bodyRequestValidator';
import sessionValidator from './sessionValidator';

const middlewares = {
  reclamos: [
    bodyRequestValidator,
    sessionValidator
  ]
}

export default function exportMiddlewares({ route, middlewareParameters }:ExportMiddlewaresParams) {
  const arrMiddleware = Object.keys(middlewares).filter(key => key === route);

  return arrMiddleware.map(middleware => middleware(middlewareParameters))


}
