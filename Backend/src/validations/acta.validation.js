export function validarActa(data) {
  const { titulo, contenido, reunionId } = data;

  if (!titulo || !contenido || !reunionId) return "Faltan campos";

  if (typeof titulo !== "string" || titulo.trim().length < 5 || titulo.length > 100) {
    return "El título debe tener entre 5 y 100 caracteres";
  }

  if (!/^[a-zA-ZÁÉÍÓÚÑáéíóú0-9\s.,:;'"()-]+$/.test(titulo)) {
    return "El título contiene caracteres no válidos";
  }

  if (typeof contenido !== "string" || contenido.trim().length < 10) {
    return "El contenido debe tener al menos 10 caracteres";
  }

  if (!Number.isInteger(reunionId) || reunionId <= 0) {
    return "El ID de reunión no es válido";
  }

  return null;
}
