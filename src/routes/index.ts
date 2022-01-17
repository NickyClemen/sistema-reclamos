import {
  Application,
  Router,
  Request,
  Response,
  NextFunction
} from 'express';

export default function handler({ app }:{ app:Application }):void {
  const router:Router = Router();

  app.use('/api');

  router.get('/reclamo', (req:Request, res:Response, next:NextFunction) => {});

  router.post('/reclamo', (req:Request, res:Response, next:NextFunction) => {});

  router.put('/reclamo/:id', (req:Request, res:Response, next:NextFunction) => {});

  router.delete('/reclamo/:id', (req:Request, res:Response, next:NextFunction) => {});
}