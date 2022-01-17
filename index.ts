import { Server } from 'http';
import { AddressInfo } from 'net';

import express, { Application } from 'express';

import Config  from '@config';
const { port } = new Config();

import handler from '@routes';

const app:Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

handler({ app });

const server:Server = app.listen(port, () => {
  const { port } = server.address() as AddressInfo;

  console.log(`Servidor escuchando desde el puerto ${ port }.`);
});