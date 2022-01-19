import { Server } from 'http';
import { AddressInfo } from 'net';

import express, { Application } from 'express';
import morgan from 'morgan';

import Config from '@config';
const { PORT } = new Config();

import debuggingLog from '@debug';

import handler from '@routes';

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('tiny'));

handler({ app });

const server: Server = app.listen(PORT, () => {
  const { port } = server.address() as AddressInfo;

  debuggingLog(`Servidor escuchando desde el puerto ${port}.`);
});
