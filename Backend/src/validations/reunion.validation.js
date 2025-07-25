import Joi from "joi";

export const reunionValidation = Joi.object({
  asunto: Joi.string().min(6).max(100).required(),
  fechaInicio: Joi.date().iso().required(),
});
