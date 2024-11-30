import Joi from 'joi';

export const register = {
  body: Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
  }).required(),
};

export const login = {
  body: Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
  }).required(),
};

export const requireAuth = {
    
}

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
