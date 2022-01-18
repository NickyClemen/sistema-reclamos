import Joi from 'joi';

export const RequestParams = Joi.object({
  id: Joi.string()
    .guid({ version: ['uuidv4'] })
    .required(),
});

export const Comuna = Joi.object({
  nombre: Joi.string().required(),
  barrios: Joi.array().items(Joi.string()).required(),
});

export const Reclamo = Joi.object({
  userId: Joi.string()
    .guid({ version: ['uuidv4'] })
    .required(),
  id: Joi.string()
    .guid({ version: ['uuidv4'] })
    .required(),
  titulo: Joi.string().required(),
  descripcion: Joi.string().required(),
  Comuna,
  imagen: Joi.binary(),
});
