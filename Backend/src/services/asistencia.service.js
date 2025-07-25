import { AppDataSource } from "../config/configDb.js";

export async function createAsistenciaService(datos) {
  try {
    const { reunionId, hogarId, asistencia } = datos;

    if (!reunionId || !hogarId) {
      return [null, "Faltan campos obligatorios"];
    }

    const asistenciaRepo = AppDataSource.getRepository("Asistencia");

    const existeAsistencia = await asistenciaRepo.findOne({
      where: {
        reunion: { id: reunionId },
        hogar: { id: hogarId }
      }
    });

    if (existeAsistencia) {
      return [null, "Ya existe una asistencia registrada para esta reunión y hogar"];
    }

    const nuevaAsistencia = asistenciaRepo.create({
      asistencia: asistencia,
      reunion: { id: reunionId },
      hogar: { id: hogarId }
    });

    await asistenciaRepo.save(nuevaAsistencia);

    return [nuevaAsistencia, null];

  } catch (error) {
    console.error("Error al crear asistencia:", error);
    return [null, "Error interno del servidor"];
  }
}
export async function getAllAsistenciasService() {
  try {
    const asistenciaRepo = AppDataSource.getRepository("Asistencia");
    const asistencias = await asistenciaRepo.find({
      relations: ["reunion", "hogar"],
      order: { fechaCreacion: "ASC" }
    });
    return [asistencias, null];
  } catch (error) {
    console.error("Error al obtener asistencias:", error);
    return [null, "Error interno del servidor"];
  }
}
export async function getAsistenciaService(id) {
  try {
    const asistenciaRepo = AppDataSource.getRepository("Asistencia");

    const asistencia = await asistenciaRepo.findOne({
      where: { id },
      relations: ["reunion", "hogar"]
    });

    if (!asistencia) {
      return [null, "Asistencia no encontrada"];
    }

    return [asistencia, null];
  } catch (error) {
    console.error("Error al obtener asistencia:", error);
    return [null, "Error interno del servidor"];
  }
}
export async function getAsistenciasPorHogarService(hogarId) {
  try {
    const asistenciaRepo = AppDataSource.getRepository("Asistencia");

    const asistencias = await asistenciaRepo.find({
      where: { hogar: { id: hogarId } },
      relations: ["reunion"]
    });

    return [asistencias, null];

  } catch (error) {
    console.error("Error al obtener asistencias por hogar:", error);
    return [null, "Error interno del servidor"];
  }
}

export async function getAsistenciasPorReunionService(reunionId) {
  try {
    const asistenciaRepo = AppDataSource.getRepository("Asistencia");

    const asistencias = await asistenciaRepo.find({
      where: { reunion: { id: reunionId } },
      relations: ["hogar"]
    });

    return [asistencias, null];

  } catch (error) {
    console.error("Error al obtener asistencias por reunión:", error);
    return [null, "Error interno del servidor"];
  }
}
