import Joi from "joi";

const citySchema = Joi.object({
  city: Joi.string()
    .required()
    .min(2)
    .max(50)
    .pattern(/^\w+(?:\s+\w+)*$/),
  description: Joi.string().min(3).max(100),
  image: Joi.string(),
});

export default citySchema;

export const patchCitySchema = Joi.object({
  city: Joi.string()
    .min(2)
    .max(50)
    .pattern(/^\w+(?:\s+\w+)*$/),
  description: Joi.string().min(3).max(100),
  image: Joi.string(),
});
