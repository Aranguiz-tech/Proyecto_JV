import Joi from "joi";

export const solicitudEstadoQueryValidation = Joi.object({
  id: Joi.number().integer().positive().messages({
    "number.base": "El id debe ser un número.",
    "number.integer": "El id debe ser un número entero.",
    "number.positive": "El id debe ser positivo.",
  }),
});

export const updateEstadoBodyValidation = Joi.object({
  estado: Joi.string()
      .valid("Pendiente", "Aprobado", "Rechazado")
      .insensitive()
      .messages({
        "any.only": "El estado debe ser 'Pendiente', 'Aprobado' o 'Rechazado'.",
    }),
  justificacionDeRechazo: Joi.string()
    .allow("", null)
    .min(0)
    .max(100)
    .pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
    .messages({
      "string.pattern.base":
        "La justificacion de rechazo solo puede contener letras y espacios.",
        "string.max": "La justificacion de rechazo debe tener máximo 25 caracteres.",
    }),
}).unknown(true);
