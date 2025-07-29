import { AppDataSource } from "../config/configDb.js";

export async function createReunionService(datos) {
  try {
    const { asunto, fechaInicio } = datos;

    if (!asunto || !fechaInicio ) {
      return [null, "Faltan campos obligatorios"];
    }


    const reunionRepo = AppDataSource.getRepository("Reunion");

    const existeReunion = await reunionRepo.findOne({ where: { fechaInicio } });
    if (existeReunion) {
      return [null, "Ya existe una reunión programada para esta fecha"];
    }

    const hoy = new Date();
    const fecha = new Date(fechaInicio);

    if (fecha < hoy) {
      return [null, "La fecha de inicio no puede ser anterior a hoy"];
    }

    const nuevaReunion = reunionRepo.create({
      asunto,
      fechaInicio,
      estado: "programada",
    });

    await reunionRepo.save(nuevaReunion);

    return [nuevaReunion, null];

  } catch (error) {
    console.error("Error al crear reunión:", error);
    return [null, "Error interno del servidor"];
  }
}

export async function getAllReunionesService() {
  try {
    const reunionRepo = AppDataSource.getRepository("Reunion");
    const reuniones = await reunionRepo.find({ order: { fechaInicio: "ASC" } });
    return [reuniones, null];
  } catch (error) {
    console.error("Error al obtener reuniones:", error);
    return [null, "Error interno del servidor"];
  }
}

export async function cancelarReunionService(id, motivo) {
  try {
    const reunionRepo = AppDataSource.getRepository("Reunion");

    const reunion = await reunionRepo.findOne({ where: { id } });
    if (!reunion) {
      return [null, "Reunión no encontrada"];
    }

    if (reunion.estado === "cancelada") {
      return [null, "La reunión ya está cancelada"];
    }

    reunion.estado = "cancelada";
    reunion.motivoCancelacion = motivo || "Sin motivo especificado";

    await reunionRepo.save(reunion);

    return [reunion, null];

  } catch (error) {
    console.error("Error al cancelar reunión:", error);
    return [null, "Error interno del servidor"];
  }
}

export async function deleteReunionService(id) {
  try {
    const reunionRepo = AppDataSource.getRepository("Reunion");

    const reunion = await reunionRepo.findOne({ where: { id } });
    if (!reunion) {
      return [null, "Reunión no encontrada"];
    }

    await reunionRepo.remove(reunion);
    return [reunion, null];
  } catch (error) {
    console.error("Error al eliminar reunión:", error);
    return [null, "Error interno del servidor"];
  }
}
