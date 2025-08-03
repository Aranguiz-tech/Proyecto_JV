import Joi from "joi";

export const solicitudQueryValidation = Joi.object({
  id: Joi.number().integer().positive().messages({
    "number.base": "El id debe ser un número.",
    "number.integer": "El id debe ser un número entero.",
    "number.positive": "El id debe ser positivo.",
  }),
  rut: Joi.string()
      .pattern(/^(?:(?:[1-9]\d{0}|[1-2]\d{1})(\.\d{3}){2}|[1-9]\d{6}|[1-2]\d{7}|29\.999\.999|29999999)-[\dkK]$/)
      .messages({
        "string.pattern.base": "Formato rut inválido, debe ser xx.xxx.xxx-x o xxxxxxxx-x.",
    }),
});

export const solicitudBodyValidation = Joi.object({
  tipo: Joi.string()
    .valid("Certificado de Residencia")
    .insensitive()
    .required()
    .messages({
      "any.only": "El tipo debe ser 'Certificado de Residencia'.",
      "any.required": "El tipo es obligatorio.",
    }),
  motivo: Joi.string()
    .valid(
      "Para fines personales",
      "Para fines laborales",
      "Para fines escolares",
      "Para fines judiciales",
      "Para fines gubernamentales",
      "Para consultar"
    )
    .insensitive()
    .required()
    .messages({
      "any.only":
        "El motivo debe ser uno de: 'Para fines personales', 'Para fines laborales', 'Para fines escolares', 'Para fines judiciales', 'Para fines gubernamentales', 'Para consultar'.",
      "any.required": "El motivo es obligatorio.",
    }),
  
}).unknown(true);
