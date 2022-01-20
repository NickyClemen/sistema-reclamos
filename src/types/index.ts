import { Request, Response, NextFunction } from 'express';

import Comuna from '@models/Comuna.model';

export type ComunaKeys = {
  [key: string]: Comuna;
};

export type PutParameters = {
  id: string;
  updateValues: UpdateValueKeys;
};

type UpdateValueKeys = {
  titulo: string;
  descripcion: string;
  imagen?: File;
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
  nombreComuna: string;
  imagen: File;
};

export type ExportMiddlewaresParams = {
  prop: string;
};
