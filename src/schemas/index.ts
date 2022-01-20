import Joi from 'joi';

export const RequestParams = Joi.object({
  id: Joi.string()
    .guid({ version: ['uuidv4'] })
    .required(),
});

export const ActualizacionReclamo = Joi.object({
  titulo: Joi.string(),
  descripcion: Joi.string(),
  imagen: Joi.binary(),
});

export const Reclamo = Joi.object({
  userId: Joi.string().required(),
  titulo: Joi.string().required(),
  descripcion: Joi.string().required(),
  nombreComuna: Joi.string().required(),
  imagen: Joi.binary(),
});
