import * as Joi from "@hapi/joi";

export const envConfigSchema = Joi.object({
    DATABASE_HOSTNAME: Joi.string().required(),
    DATABASE_POST: Joi.number().required(),
    DATABASE_USERNAME: Joi.string().required(),
    DATABASE_PASSWORD: Joi.string().allow(''),
    DATABASE_NAME: Joi.string().required(),
});