import { Application, Router, Request, Response, NextFunction } from 'express';

import MemoryStorage from '@cache';

import ReclamoModel from '@models/Reclamo.model';

import { ReclamoParameters, Params } from '@types';

import { objectIsEmpty } from '@utils';

import * as successMessage from '@static/successMessage.json';
import * as errorMessage from '@static/errorMessage.json';

import paramsRequestValidator from '@middlewares/paramsRequestValidator';
import bodyPutRequestValidator from '@middlewares/bodyPutRequestValidator';
import bodyRequestValidator from '@middlewares/bodyRequestValidator';

import debuggingLog from '@debug';

export default function handler({ app }: { app: Application }): void {
  const router: Router = Router();

  const memoryStorage = new MemoryStorage();

  app.use('/api', router);

  router.get(
    '/reclamos',
    (req: Request<Params, unknown, ReclamoParameters, unknown>, res: Response, next: NextFunction) => {
      try {
        const getReclamos: (ReclamoModel | string)[] = memoryStorage.getEntries();
        debuggingLog(`[router]:GET-getReclamos`, JSON.stringify(getReclamos));

        if (getReclamos.length === 0) {
          res.status(404).json({
            code: 404,
            message: errorMessage['get'],
          });
        }

        res.status(200).json({ code: 200, reclamos: getReclamos });
      } catch (err: unknown) {
        const error = err as Error;
        next(error);
      }
    },
  );

  router.get(
    '/reclamo/:id',
    paramsRequestValidator,
    (req: Request<Params, unknown, ReclamoParameters, unknown>, res: Response, next: NextFunction) => {
      try {
        const {
          params: { id },
        }: Request<Params, unknown, ReclamoParameters, unknown> = req;
        const getReclamo: ReclamoModel = memoryStorage.getEntryById(id);
        debuggingLog(`[router]:GET-getReclamoById`, JSON.stringify(getReclamo));

        if (!objectIsEmpty(getReclamo)) {
          res.status(422).json({
            code: 422,
            message: errorMessage['get'],
          });
        }

        res.status(200).json({ code: 200, reclamo: getReclamo });
      } catch (err: unknown) {
        const error = err as Error;
        next(error);
      }
    },
  );

  router.post(
    '/reclamo',
    bodyRequestValidator,
    (req: Request<Params, unknown, ReclamoParameters, unknown>, res: Response, next: NextFunction) => {
      try {
        const {
          body: { userId, titulo, descripcion, nombreComuna, imagen },
        }: Request<Params, unknown, ReclamoParameters, unknown> = req;
        debuggingLog(`[router]:POST`, JSON.stringify({ userId, titulo, descripcion, nombreComuna, imagen }));

        const reclamo = new ReclamoModel({
          userId,
          titulo,
          descripcion,
          nombreComuna,
          imagen,
        });

        if (reclamo) {
          debuggingLog(`[router]:POST-setReclamo`, JSON.stringify(reclamo));
          memoryStorage.setEntry(reclamo);

          res.status(200).json({
            code: 200,
            message: successMessage['post'],
          });
        }
      } catch (err: unknown) {
        const error = err as Error;

        next(error);
      }
    },
  );

  router.put(
    '/reclamo/:id',
    bodyPutRequestValidator,
    paramsRequestValidator,
    (req: Request<Params, unknown, ReclamoParameters, unknown>, res: Response, next: NextFunction) => {
      try {
        const {
          params: { id },
          body: { titulo, descripcion, imagen },
        }: Request<Params, unknown, ReclamoParameters, unknown> = req;
        debuggingLog(`[router]:PUT-id`, JSON.stringify(id));
        debuggingLog(`[router]:PUT-body`, JSON.stringify({ titulo, descripcion, imagen }));

        const putRegistro = memoryStorage.putEntry({
          id,
          updateValues: {
            titulo,
            descripcion,
            imagen,
          },
        });

        debuggingLog(`[router]:PUT-putRegistro`, JSON.stringify(putRegistro));

        if (!objectIsEmpty(putRegistro)) {
          res.status(422).json({
            code: 422,
            message: errorMessage['put'],
          });
        }

        res.status(200).json({
          code: 422,
          message: successMessage['put'],
        });
      } catch (err: unknown) {
        const error = err as Error;

        next(error);
      }
    },
  );

  router.delete(
    '/reclamo/:id',
    paramsRequestValidator,
    (req: Request<Params, unknown, ReclamoParameters, unknown>, res: Response, next: NextFunction) => {
      try {
        const {
          params: { id },
        }: Request<Params, unknown, ReclamoParameters, unknown> = req;
        debuggingLog(`[router]:delete-id`, JSON.stringify(id));

        const deletedReclamo = memoryStorage.deleteEntryById(id);
        debuggingLog(`[router]:delete`, JSON.stringify(deletedReclamo));

        if (!deletedReclamo) {
          return res.status(422).json({
            code: 422,
            message: errorMessage['delete'],
          });
        }

        res.status(200).json({
          code: 200,
          message: successMessage['delete'],
        });
      } catch (err: unknown) {
        const error = err as Error;

        next(error);
      }
    },
  );
}
