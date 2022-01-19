import { Request, Response, NextFunction } from 'express';

export type PutParameters = {
  id: string;
  updateValues: UpdateValueKeys;
};

export type UpdateValueKeys = {
  titulo: string;
  descripcion: string;
  imagen?: File;
};

export type ReclamoUpdateKeys = {
  titulo: string;
  descripcion: string;
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
