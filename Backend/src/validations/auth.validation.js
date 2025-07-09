import Joi from "joi";

export const domainEmailValidator = (value, helper) => {
  const dominiosValidos = ["@gmail.cl", "@gmail.com", "@hotmail.cl", "@hotmail.com"];
  const valido = dominiosValidos.some((dominio) => value.endsWith(dominio));
  if (!valido) {
    return helper.message("El correo debe finalizar en @gmail.cl, @gmail.com, @hotmail.cl o @hotmail.com.");
  }
  return value;
};

export const authValidation = Joi.object({
  email: Joi.string()
    .max(35)
    .email()
    .required()
    .messages({
      "string.empty": "El correo electrónico no puede estar vacío.",
      "any.required": "El correo electrónico es obligatorio.",
      "string.base": "El correo electrónico debe ser de tipo texto.",
      "string.email": "El correo electrónico debe finalizar en @gmail.cl.",
      "string.max": "El correo electrónico debe tener como máximo 35 caracteres.",
    })
    .custom(domainEmailValidator, "Validación dominio email"),
  password: Joi.string()
    .min(8)
    .max(26)
    .pattern(/^[a-zA-Z0-9]+$/)
    .required()
    .messages({
      "string.empty": "La contraseña no puede estar vacía.",
      "any.required": "La contraseña es obligatoria.",
      "string.base": "La contraseña debe ser de tipo texto.",
      "string.min": "La contraseña debe tener al menos 8 caracteres.",
      "string.max": "La contraseña debe tener como máximo 26 caracteres.",
      "string.pattern.base": "La contraseña solo puede contener letras y números.",
    }),
}).unknown(false).messages({
  "object.unknown": "No se permiten propiedades adicionales.",
});

export const registerValidation = Joi.object({
    nombre: Joi.string().min(3).max(25).pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/).messages({
      "string.pattern.base": "El nombre solo puede contener letras y espacios.",
    }),
    apellido: Joi.string().min(3).max(25).pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/).messages({
      "string.pattern.base": "El apellido solo puede contener letras y espacios.",
    }),
    rut: Joi.string()
    .min(9)
    .max(12)
    .required()
    .pattern(/^(?:(?:[1-9]\d{0}|[1-2]\d{1})(\.\d{3}){2}|[1-9]\d{6}|[1-2]\d{7}|29\.999\.999|29999999)-[\dkK]$/)
    .messages({
      "string.empty": "El rut no puede estar vacío.",
      "string.base": "El rut debe ser de tipo string.",
      "string.min": "El rut debe tener como mínimo 9 caracteres.",
      "string.max": "El rut debe tener como máximo 12 caracteres.",
      "string.pattern.base": "Formato rut inválido, debe ser xx.xxx.xxx-x o xxxxxxxx-x.",
    }),
  email: Joi.string().email().max(35).custom(domainEmailValidator).messages({
    "string.email": "El correo debe finalizar en @gmail.cl, @gmail.com, @hotmail.cl o @hotmail.com.",
  }),
    telefono: Joi.string().pattern(/^\d{9}$/).messages({
      "string.pattern.base": "El teléfono debe tener exactamente 9 dígitos.",
    }),
  password: Joi.string()
    .min(8)
    .max(26)
    .pattern(/^[a-zA-Z0-9]+$/)
    .required()
    .messages({
      "string.empty": "La contraseña no puede estar vacía.",
      "any.required": "La contraseña es obligatorio.",
      "string.base": "La contraseña debe ser de tipo texto.",
      "string.min": "La contraseña debe tener al menos 8 caracteres.",
      "string.max": "La contraseña debe tener como máximo 26 caracteres.",
      "string.pattern.base": "La contraseña solo puede contener letras y números.",
    }),
      rol: Joi.string().valid("vecino", "jefe de hogar", "administrador").messages({
        "any.only": "El rol debe ser 'vecino', 'jefe de hogar' o 'administrador'.",
      }),
        id_hogar: Joi.number().integer().positive().messages({
          "number.base": "El id debe ser un número.",
          "number.integer": "El id debe ser un número entero.",
          "number.positive": "El id debe ser positivo.",
        }),
    })
