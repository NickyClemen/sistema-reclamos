# Challenge técnico para Wingu
## Sistema de reclamos

CRUD para procesar reclamos de los usuarios. Escrita utilizando Node-Express con Typescript. Los reclamos se almacenan en memoria utilizando node-cache.

Para poder levantar el proyecto en local, el prerrequisito es tener Docker o Node instalado.
Para Docker, se puede correr:

``` bash
docker build . -t clemenicky/sistema-reclamos
docker run -p 3000:4000 clemenicky/sistema-reclamos
```

Usando npm/yarn, correr:

``` bash
npm install ó yarn install
yarn build && yarn start ó npm run build && npm start
```
Para correrlo en modo desarrollo:

```bash
yarn dev ó npm run dev
```

### Base URL
- Docker: http://localhost:4000/api
- NPM: http://localhost:3000/api

### Headers

``` json
{
  "Content-Type": "application.json",
  "Accept": "application.json"
}
```
### Rutas

- **POST /api/reclamo - Da de alta un reclamo.**
  BODY - [titulo, descripción, imagen, comuna]
  http://localhost:3000/api/reclamo

- **GET /api/reclamos - Trae todos los registros almacenados en memoria.**
  http://localhost:3000/api/reclamos

- **GET /api/reclamo/:id - Trae un reclamo por el id.**
  PARAMS - ID del reclamo.
  http://localhost:3000/api/reclamo/ff7aa67b-3771-46de-ae50-70e4d8e633bd

- **PUT /api/reclamo/:id - Actualiza  un reclamo por id.**
  PARAMS - ID del reclamo
  BODY - [userId, titulo, decripción, imagen] a actualizar.
  http://localhost:3000/api/reclamo/ff7aa67b-3771-46de-ae50-70e4d8e633bd

- **DELETE /api/reclamo/:id - Elimina un reclamo por id.**
  PARAMS - ID del reclamo
  http://localhost:3000/api/reclamo/ff7aa67b-3771-46de-ae50-70e4d8e633bd

