import { Application, Router, Request, Response } from 'express';

import MemoryStorage from '@cache';

import ReclamoModel from '@models/Reclamo.model';

import exportMiddlewares from '@middlewares';
import { ReclamoParameters, Params } from '@types';

import { objectIsEmpty } from '@utils';

import * as successMessage from '@static/successMessage.json';
import * as errorMessage from '@static/errorMessage.json';

export default function handler({ app }: { app: Application }): void {
  const router: Router = Router();

  const memoryStorage = new MemoryStorage();

  app.use('/api');

  router.get(
    '/reclamo/:id',
    ...exportMiddlewares({ prop: 'params' }),
    (
      req: Request<Params, unknown, ReclamoParameters, unknown>,
      res: Response
    ) => {
      const {
        params: { id },
      }: Request<Params, unknown, ReclamoParameters, unknown> = req;
      const getReclamo: ReclamoModel = memoryStorage.getEntryById(id);

      if (!objectIsEmpty(getReclamo)) {
        return res
          .status(422)
          .json({ code: 422, message: errorMessage['get'] });
      }

      return res.status(200).json({ code: 200, reclamo: getReclamo });
    }
  );

  router.post(
    '/reclamo',
    ...exportMiddlewares({ prop: 'body' }),
    (
      req: Request<Params, unknown, ReclamoParameters, unknown>,
      res: Response
    ) => {
      const {
        body: { userId, titulo, descripcion, comuna, imagen },
      }: Request<Params, unknown, ReclamoParameters, unknown> = req;

      const reclamo = new ReclamoModel({
        userId,
        titulo,
        descripcion,
        comuna,
        imagen,
      });

      if (reclamo) {
        memoryStorage.setEntry(reclamo);

        return res
          .status(200)
          .json({ code: 200, message: successMessage['post'] });
      }
    }
  );

  router.put(
    '/reclamo/:id',
    ...exportMiddlewares({ prop: 'params' }),
    (
      req: Request<Params, unknown, ReclamoParameters, unknown>,
      res: Response
    ) => {
      const {
        params: { id },
        body: { titulo, descripcion, imagen },
      }: Request<Params, unknown, ReclamoParameters, unknown> = req;

      const putRegistro = memoryStorage.putEntry({
        id,
        updateValues: {
          titulo,
          descripcion,
          imagen,
        },
      });

      if (!objectIsEmpty(putRegistro)) {
        return res.status(422).json({
          code: 422,
          message: errorMessage['put'],
        });
      }

      return res.status(200).json({
        code: 422,
        message: successMessage['put'],
      });
    }
  );

  router.delete(
    '/reclamo/:id',
    ...exportMiddlewares({ prop: 'params' }),
    (
      req: Request<Params, unknown, ReclamoParameters, unknown>,
      res: Response
    ) => {
      const {
        params: { id },
      }: Request<Params, unknown, ReclamoParameters, unknown> = req;
      const deletedReclamo = memoryStorage.deleteEntryById(id);

      if (!deletedReclamo) {
        return res.status(422).json({
          code: 422,
          message: errorMessage['delete'],
        });
      }

      return res.status(200).json({
        code: 200,
        message: successMessage['delete'],
      });
    }
  );
}
