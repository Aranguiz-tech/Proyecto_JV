import Joi from "joi";

export const hogarValidation = Joi.object({
  direccion: Joi.string().min(5).max(60).required().messages({
    "string.base": "La dirección debe ser un texto.",
    "string.empty": "La dirección no puede estar vacía.",
    "string.min": "La dirección debe tener al menos 5 caracteres.",
    "string.max": "La dirección no debe superar los 60 caracteres.",
    "any.required": "La dirección es obligatoria.",
  }),
});
