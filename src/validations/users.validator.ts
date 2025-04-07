import Joi from "joi";

export const create = Joi.object({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    name: Joi.string().required(),
    role: Joi.string().required().valid("user", "admin"),
  }),
});

export const index = Joi.object({
  query: Joi.object().keys({
    sortBy: Joi.string(),
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).max(100).default(10),
  }),
});
