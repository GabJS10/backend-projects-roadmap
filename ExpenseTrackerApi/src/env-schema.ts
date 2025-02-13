import * as Joi from 'joi';


export const envSchema = Joi.object({
    JWT_SECRET: Joi.string().required(),
    JWT_REFRESH_SECRET: Joi.string().required(),
    DATABASE_URL: Joi.string().required(),
    PORT: Joi.number().default(3000),
})