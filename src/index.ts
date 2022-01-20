import { Server } from 'http';
import { AddressInfo } from 'net';

import express, { Application } from 'express';
import morgan from 'morgan';

import Config from '@config';
const { PORT, HOST } = new Config();

import debuggingLog from '@debug';

import handler from '@routes';

import errorHandler from '@middlewares/errorMiddleware';
import setHeadersMiddleware from '@middlewares/setHeadersMiddleware';

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('tiny'));

app.use(setHeadersMiddleware);

handler({ app });

app.use(errorHandler);

const server: Server = app.listen(PORT, () => {
  const { port } = server.address() as AddressInfo;
  debuggingLog('[server]', `Servidor escuchando desde el puerto ${port}.`);
});
