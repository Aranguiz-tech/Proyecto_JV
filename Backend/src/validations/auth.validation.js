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
  nombre: Joi.string().min(3).max(25).pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/).required()
    .messages({
      "string.empty": "El nombre no puede estar vacío.",
      "any.required": "El nombre es obligatorio.",
      "string.pattern.base": "El nombre solo puede contener letras y espacios.",
    }),
  apellido: Joi.string().min(3).max(25).pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/).required()
    .messages({
      "string.empty": "El apellido no puede estar vacío.",
      "any.required": "El apellido es obligatorio.",
      "string.pattern.base": "El apellido solo puede contener letras y espacios.",
    }),
  rut: Joi.string().min(9).max(12)
    .pattern(/^(?:(?:[1-9]\d{0}|[1-2]\d{1})(\.\d{3}){2}|[1-9]\d{6}|[1-2]\d{7}|29\.999\.999|29999999)-[\dkK]$/)
    .required()
    .messages({
      "string.pattern.base": "Formato rut inválido, debe ser xx.xxx.xxx-x o xxxxxxxx-x.",
      "any.required": "El rut es obligatorio.",
    }),
  email: Joi.string().email().max(35).custom(domainEmailValidator).required()
    .messages({
      "string.email": "El email debe finalizar en @gmail.cl, @gmail.com, @hotmail.cl o @hotmail.com.",
      "any.required": "El email es obligatorio.",
    }),
  telefono: Joi.string().pattern(/^\d{9}$/).required()
    .messages({
      "string.pattern.base": "El teléfono debe tener exactamente 9 dígitos.",
      "any.required": "El teléfono es obligatorio.",
    }),
  password: Joi.string().min(8).max(26).pattern(/^[a-zA-Z0-9]+$/).required()
    .messages({
      "string.pattern.base": "La contraseña solo puede contener letras y números.",
      "any.required": "La contraseña es obligatoria.",
    }),
  rol: Joi.string().valid("vecino", "jefe de hogar", "administrador").required()
    .messages({
      "any.only": "El rol debe ser 'vecino', 'jefe de hogar' o 'administrador'.",
      "any.required": "El rol es obligatorio.",
    }),
  hogarId: Joi.number().positive().integer().required()
    .messages({
      "number.base": "El ID del hogar debe ser un número positivo.",
      "any.required": "El ID del hogar es obligatorio.",
    }),
}).unknown(false).messages({
  "object.unknown": "No se permiten propiedades adicionales.",
});

export const authValidation = Joi.object({
  email: Joi.string().email().max(35).custom(domainEmailValidator).required()
    .messages({
      "string.email": "El email debe finalizar en @gmail.cl, @gmail.com, @hotmail.cl o @hotmail.com.",
      "any.required": "El email es obligatorio.",
    }),
  password: Joi.string().min(8).max(26).pattern(/^[a-zA-Z0-9]+$/).required()
    .messages({
      "string.pattern.base": "La contraseña solo puede contener letras y números.",
      "any.required": "La contraseña es obligatoria.",
    }),
}).unknown(false).messages({
  "object.unknown": "No se permiten propiedades adicionales.",
});
