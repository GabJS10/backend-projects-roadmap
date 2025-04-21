import * as joi from 'joi';

export const envSchema = joi.object({
  DATABASE_URL: joi.string().required(),
  JWT_SECRET: joi.string().required(),
  JWT_REFRESH_SECRET: joi.string().required(),
  PORT: joi.string().default(3000),
  AWS_ACCESS_KEY_ID: joi.string().required(),
  AWS_SECRET_ACCESS_KEY: joi.string().required(),
  AWS_BUCKET_NAME: joi.string().required(),
  AWS_REGION: joi.string().required(),
});
