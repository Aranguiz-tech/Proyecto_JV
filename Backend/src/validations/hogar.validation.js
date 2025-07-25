import Joi from "joi";

export const hogarValidation = Joi.object({
  tipo: Joi.string().valid("Psj.", "Av.").required()
    .messages({ "any.only": "El tipo debe ser 'Psj.' o 'Av.'" }),
  Direccion: Joi.string().min(3).max(50).required()
    .messages({
      "string.empty": "El nombre de la calle es obligatorio"
    }),
  numero: Joi.number().integer().positive().required()
    .messages({
      "number.base": "El número debe ser un número válido",
      "number.positive": "El número debe ser mayor que 0"
    }),
});
