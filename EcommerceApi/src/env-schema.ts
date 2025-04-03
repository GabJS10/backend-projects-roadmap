import * as joi from 'joi';

export const envSchema = joi.object({
  DATABASE_URL: joi.string().required(),
  JWT_SECRET: joi.string().required(),
  JWT_REFRESH_SECRET: joi.string().required(),
  PORT: joi.string().default(3000),
  STRIPE_SECRET_KEY: joi.string().required(),
});
