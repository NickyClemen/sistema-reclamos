import Joi from 'joi';

export const RequestParams = Joi.object({
  id: Joi.string()
    .guid({ version: ['uuidv4'] })
    .required(),
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
  nombreComuna: Joi.string().required(),
  imagen: Joi.binary(),
});
