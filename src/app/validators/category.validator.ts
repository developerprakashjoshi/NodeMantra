import Joi from "joi";

export const createCategory = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  status: Joi.number().required(),
}).options({ abortEarly: false });

export const updateCategory = Joi.object({
  id: Joi.string().required(),
  name: Joi.string().optional(),
  description: Joi.string().optional(),
  status: Joi.number().optional(),
}).options({ abortEarly: false });

export const deleteCategory = Joi.object({
  id: Joi.string().required(),
});
