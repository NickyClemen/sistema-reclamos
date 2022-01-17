import { Request, Response, NextFunction } from 'express';

import IComuna from '@interfaces/IComuna.interface';

export type Params = {
  id:string;
}

export type MiddlewareParameters = {
  req:Request<Params, {}, ReclamoParameters, {}>,
  res:Response,
  next:NextFunction
}

export type ReclamoParameters = {
  userId:string,
  titulo:string,
  descripcion:string,
  comuna:IComuna,
  imagen:File
}

export type ExportMiddlewaresParams = {
  prop:string,
  middlewareParameters:MiddlewareParameters
}