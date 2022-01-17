import {
  Application,
  Router,
  Request,
  Response,
  NextFunction
} from 'express';

import MemoryStorage from '@cache';

import ReclamoModel from '@models/Reclamo.model';

import exportMiddlewares from '@middlewares';
import { ReclamoParameters, Params } from '@types';

import * as successMessage from '@static/successMessage.json';
import * as errorMessage from '@static/errorMessage.json';

export default function handler({ app }:{ app:Application }):void {
  const router:Router = Router();

  const memoryStorage = new MemoryStorage();

  app.use('/api');

  router.get('/reclamo/:id', ...exportMiddlewares({
    prop: 'params',
    middlewareParameters: { req, res, next }
  }),(req:Request, res:Response, next:NextFunction) => {});

  router.post('/reclamo', ...exportMiddlewares({
    prop: 'body',
    middlewareParameters: { req, res, next }
  }), (req:Request<Params, {}, ReclamoParameters, {}>, res:Response, next:NextFunction) => {
    const { body: {
      userId,
      titulo,
      descripcion,
      comuna,
      imagen
    } }:Request<Params, {}, ReclamoParameters, {}> = req;

    const reclamo = new ReclamoModel({
      userId,
      titulo,
      descripcion,
      comuna,
      imagen
    });

    if(reclamo) {
      memoryStorage.setEntry(reclamo);
      return res.status(200).json({ code: 200, message: successMessage['post'] });
    }
  });

  router.put('/reclamo/:id', ...exportMiddlewares({
    prop: 'params',
    middlewareParameters: { req, res, next }
  }), (req:Request<Params, {}, ReclamoParameters, {}>, res:Response, next:NextFunction) => {
    const { params: { id } }:Request<Params, {}, ReclamoParameters, {}>  = req;
  });

  router.delete('/reclamo/:id', ...exportMiddlewares({
    prop: 'params',
    middlewareParameters: { req, res, next }
  }), (req:Request<Params, {}, ReclamoParameters, {}>, res:Response, next:NextFunction) => {
    const { params: { id } }:Request<Params, {}, ReclamoParameters, {}>  = req;
    const deletedReclamo = memoryStorage.deleteEntryById(id);

    if(!deletedReclamo) {
      return res.status(422).json({ code: 422, message: errorMessage['delete'] });
    }

    return res.status(200).json({ code: 200, message: successMessage['delete'] });
  });
}