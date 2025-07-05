import Joi from "joi";

export const domainEmailValidator = (value, helper) => {
  const dominiosValidos = ["@gmail.cl", "@gmail.com", "@hotmail.cl", "@hotmail.com"];
  const valido = dominiosValidos.some((dominio) => value.endsWith(dominio));
  if (!valido) {
    return helper.message("El correo debe finalizar en @gmail.cl, @gmail.com, @hotmail.cl o @hotmail.com.");
  }
  return value;
};


export const userQueryValidation = Joi.object({
  id: Joi.number().integer().positive().messages({
    "number.base": "El id debe ser un número.",
    "number.integer": "El id debe ser un número entero.",
    "number.positive": "El id debe ser positivo.",
  }),
  email: Joi.string().email().max(35).custom(domainEmailValidator).messages({
    "string.email": "El correo electrónico debe finalizar en @gmail.cl, @gmail.com, @hotmail.cl o @hotmail.com.",
  }),
  rut: Joi.string()
    .pattern(/^(?:(?:[1-9]\d{0}|[1-2]\d{1})(\.\d{3}){2}|[1-9]\d{6}|[1-2]\d{7}|29\.999\.999|29999999)-[\dkK]$/)
    .messages({
      "string.pattern.base": "Formato rut inválido, debe ser xx.xxx.xxx-x o xxxxxxxx-x.",
    }),
})


export const userBodyValidation = Joi.object({
  nombre: Joi.string().min(3).max(25).pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/).messages({
    "string.pattern.base": "El nombre solo puede contener letras y espacios.",
  }),
  apellido: Joi.string().min(3).max(25).pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/).messages({
    "string.pattern.base": "El apellido solo puede contener letras y espacios.",
  }),
  email: Joi.string().email().min(15).max(35).custom(domainEmailValidator).messages({
    "string.email": "El correo debe finalizar en @gmail.cl, @gmail.com, @hotmail.cl o @hotmail.com.",
  }),
  password: Joi.string().min(8).max(26).pattern(/^[a-zA-Z0-9]+$/).messages({
    "string.pattern.base": "La contraseña solo puede contener letras y números.",
  }),
  newPassword: Joi.string().allow("").min(8).max(26).pattern(/^[a-zA-Z0-9]+$/).messages({
    "string.pattern.base": "La nueva contraseña solo puede contener letras y números.",
  }),
  rut: Joi.string()
    .min(9)
    .max(12)
    .pattern(/^(?:(?:[1-9]\d{0}|[1-2]\d{1})(\.\d{3}){2}|[1-9]\d{6}|[1-2]\d{7}|29\.999\.999|29999999)-[\dkK]$/)
    .messages({
      "string.pattern.base": "Formato rut inválido, debe ser xx.xxx.xxx-x o xxxxxxxx-x.",
    }),
  telefono: Joi.string().pattern(/^\d{9}$/).messages({
    "string.pattern.base": "El teléfono debe tener exactamente 9 dígitos.",
  }),
  rol: Joi.string().valid("vecino", "jefe de hogar", "administrador").messages({
    "any.only": "El rol debe ser 'vecino', 'jefe de hogar' o 'administrador'.",
  }),
})
