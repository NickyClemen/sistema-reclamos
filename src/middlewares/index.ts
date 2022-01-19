import { RequestHandler } from 'express';

import debuggingLog from '@debug';

import { ExportMiddlewaresParams } from '@types';

import bodyRequestValidator from '@middlewares/bodyRequestValidator';
import paramsRequestValidator from '@middlewares/paramsRequestValidator';
import sessionValidator from '@middlewares/sessionValidator';

const middlewares = {
  body: [bodyRequestValidator, sessionValidator],
  params: [paramsRequestValidator, sessionValidator],
  put: [bodyRequestValidator, paramsRequestValidator, sessionValidator],
};

const exportMiddlewares = ({ prop }: ExportMiddlewaresParams): RequestHandler[] => {
  debuggingLog(`--- [exportMiddlewares] ---`);

  const arrMiddleware = Object.keys(middlewares).filter((key: string) => key === prop);

  return arrMiddleware;
};

export default exportMiddlewares;
