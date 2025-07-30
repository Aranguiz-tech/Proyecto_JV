import Joi from "joi";

export const domainEmailValidator = (value, helper) => {
  const dominiosValidos = ["@gmail.cl", "@gmail.com", "@hotmail.cl", "@hotmail.com"];
  const valido = dominiosValidos.some((dominio) => value.endsWith(dominio));
  if (!valido) {
    return helper.message("El correo debe finalizar en @gmail.cl, @gmail.com, @hotmail.cl o @hotmail.com.");
  }
  return value;
};

export const registerValidation = Joi.object({
  nombre: Joi.string()
    .min(3)
    .max(25)
    .pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
    .required()
    .messages({
      "string.empty": "El nombre no puede estar vacío.",
      "string.min": "El nombre debe tener al menos 3 caracteres.",
      "string.max": "El nombre debe tener como máximo 25 caracteres.",
      "string.pattern.base": "El nombre solo puede contener letras y espacios.",
    }),

  apellido: Joi.string()
    .min(3)
    .max(25)
    .pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
    .required()
    .messages({
      "string.empty": "El apellido no puede estar vacío.",
      "string.min": "El apellido debe tener al menos 3 caracteres.",
      "string.max": "El apellido debe tener como máximo 25 caracteres.",
      "string.pattern.base": "El apellido solo puede contener letras y espacios.",
    }),

  rut: Joi.string()
    .min(9)
    .max(12)
    .required()
    .pattern(/^(?:(?:[1-9]\d{0}|[1-2]\d{1})(\.\d{3}){2}|[1-9]\d{6}|[1-2]\d{7}|29\.999\.999|29999999)-[\dkK]$/)
    .messages({
      "string.empty": "El rut no puede estar vacío.",
      "string.min": "El rut debe tener como mínimo 9 caracteres.",
      "string.max": "El rut debe tener como máximo 12 caracteres.",
      "string.pattern.base": "Formato rut inválido, debe ser xx.xxx.xxx-x o xxxxxxxx-x.",
    }),

  email: Joi.string()
    .email()
    .max(35)
    .required()
    .custom(domainEmailValidator)
    .messages({
      "string.empty": "El correo electrónico no puede estar vacío.",
      "string.email": "Formato de correo inválido.",
      "string.max": "El correo electrónico debe tener como máximo 35 caracteres.",
    }),

  telefono: Joi.string()
    .pattern(/^\d{9}$/)
    .messages({
      "string.pattern.base": "El teléfono debe tener exactamente 9 dígitos.",
    }),

  password: Joi.string()
    .min(8)
    .max(26)
    .pattern(/^[a-zA-Z0-9]+$/)
    .required()
    .messages({
      "string.empty": "La contraseña no puede estar vacía.",
      "string.min": "La contraseña debe tener al menos 8 caracteres.",
      "string.max": "La contraseña debe tener como máximo 26 caracteres.",
      "string.pattern.base": "La contraseña solo puede contener letras y números.",
    }),

  rol: Joi.string()
    .valid("vecino", "jefe de hogar", "administrador")
    .required()
    .messages({
      "any.only": "El rol debe ser 'vecino', 'jefe de hogar' o 'administrador'.",
      "string.empty": "El rol no puede estar vacío.",
    }),

  id_hogar: Joi.number()
    .integer()
    .positive()
    .required()
    .messages({
      "number.base": "El id del hogar debe ser un número.",
      "number.integer": "El id del hogar debe ser un número entero.",
      "number.positive": "El id del hogar debe ser positivo.",
    }),
}).unknown(false).messages({
  "object.unknown": "No se permiten propiedades adicionales.",
});
