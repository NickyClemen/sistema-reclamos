import { Request, Response, NextFunction } from 'express';

import IReclamo from '@interfaces/IReclamo.interface';

export type MiddlewareParameters = {
  req:Request<{}, {}, IReclamo>,
  res:Response,
  next:NextFunction
}

export type ExportMiddlewaresParams = {
  route:string,
  middlewareParameters:MiddlewareParameters
}