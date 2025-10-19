import * as Joi from 'joi';

export const configValidationSchema = Joi.object({

  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test')
    .default('development'),

  PORT: Joi.number().port().default(3000),

  DB_HOST: Joi.string()
    .hostname()
    .default('localhost')
    .required(),

  DB_PORT: Joi.number()
    .port()
    .default(3306)
    .required(),

  DB_USER: Joi.string()
    .required(),

  DB_PASSWORD: Joi.string()
    .allow('')
    .default('password'),

  DB_NAME: Joi.string()
    .required(),

  DB_SYNCHRONIZE: Joi.boolean().default(false),

  DB_DRIVER: Joi.string()
    .valid('mysql', 'postgres')
    .default('mysql'),

  REDIS_HOST: Joi.string()
    .hostname()
    .default('localhost')
    .required(),

  REDIS_PORT: Joi.number()
    .port()
    .default(6379)
    .required(),
});