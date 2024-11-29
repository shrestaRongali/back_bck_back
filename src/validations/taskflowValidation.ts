import Joi from 'joi';

export const addTask = {
  body: Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
  }).required(),
};

export const updateTask = {
    body: Joi.object({
        status: Joi.string().required(),
    }).required(),
}
