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

export const hogarQueryValidation = Joi.object({
  id: Joi.number().integer().positive().messages({
    "number.base": "El ID debe ser un número.",
    "number.integer": "El ID debe ser un número entero.",
    "number.positive": "El ID debe ser un número positivo.",
  }),
  direccion: Joi.string().min(3).max(60).messages({
    "string.base": "La dirección debe ser un texto.",
    "string.min": "La dirección debe tener al menos 3 caracteres.",
    "string.max": "La dirección no debe superar los 60 caracteres.",
  }),
});
