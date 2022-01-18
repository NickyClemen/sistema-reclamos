import { Request, Response, NextFunction } from 'express';

import IComuna from '@interfaces/IComuna.interface';

export type PutParameters = {
  id: string;
  updateValues: UpdateValueKeys;
};

type UpdateValueKeys = {
  titulo: string;
  descripcion: string;
  imagen: File;
};

export type Params = {
  id: string;
};

export type MiddlewareParameters = {
  req: Request<Params, unknown, ReclamoParameters, unknown>;
  res: Response;
  next: NextFunction;
};

export type ReclamoParameters = {
  userId: string;
  titulo: string;
  descripcion: string;
  comuna: IComuna;
  imagen: File;
};

export type ExportMiddlewaresParams = {
  prop: string;
};
