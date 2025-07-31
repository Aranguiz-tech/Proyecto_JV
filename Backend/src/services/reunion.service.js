import { AppDataSource } from "../config/configDb.js";

export async function createReunionService(datos) {
  try {
    const { asunto, fechaInicio, lugar } = datos;

    if (!asunto || !fechaInicio || !lugar) {
      return ["Faltan campos obligatorios"];
    }


    const reunionRepo = AppDataSource.getRepository("Reunion");

    const existeReunion = await reunionRepo.findOne({ where: { fechaInicio } });
    if (existeReunion) {
      return ["Ya existe una reunión programada para esta fecha"];
    }

    const hoy = new Date();
    const fecha = new Date(fechaInicio);

    if (fecha < hoy) {
      return [ "La fecha de inicio no puede ser anterior a hoy"];
    }

    const nuevaReunion = reunionRepo.create({
      asunto,
      fechaInicio,
      lugar,
      estado: "programada",
    });

    await reunionRepo.save(nuevaReunion);

    return [nuevaReunion];

  } catch (error) {
    console.error("Error al crear reunión:", error);
    return ["Error interno del servidor"];
  }
}

export async function getAllReunionesService() {
  try {
    const reunionRepo = AppDataSource.getRepository("Reunion");

    const reuniones = await reunionRepo.find({
      relations: { acta: true }, 
      order: { fechaInicio: "ASC" }
    });

    return [reuniones];
  } catch (error) {
    console.error("Error al obtener reuniones:", error);
    return [ "Error interno del servidor"];
  }
}


export async function cancelarReunionService(id, motivo) {
  try {
    const reunionRepo = AppDataSource.getRepository("Reunion");

    const reunion = await reunionRepo.findOne({ where: { id } });
    if (!reunion) {
      return [ "Reunión no encontrada"];
    }

    if (reunion.estado === "cancelada") {
      return [ "La reunión ya está cancelada"];
    }

    if (reunion.estado === "realizada") {
      return [ "No puedes cancelar una reunión que ya fue realizada"];
    }

    reunion.estado = "cancelada";
    reunion.motivoCancelacion = motivo || "Sin motivo especificado";

    await reunionRepo.save(reunion);

    return [reunion];

  } catch (error) {
    console.error("Error al cancelar reunión:", error);
    return [ "Error interno del servidor"];
  }
}


export async function deleteReunionService(id) {
  try {
    const reunionRepo = AppDataSource.getRepository("Reunion");

    const reunion = await reunionRepo.findOne({ where: { id } });
    if (!reunion) {
      return [ "Reunión no encontrada"];
    }

    if (reunion.estado === "realizada") {
      return ["No puedes eliminar una reunión que ya fue realizada"];
    }

    await reunionRepo.remove(reunion);
    return [reunion, null];
  } catch (error) {
    console.error("Error al eliminar reunión:", error);
    return [ "Error interno del servidor"];
  }
}

export async function finalizarReunionService(id) {
  const repo = AppDataSource.getRepository("Reunion");
  const reunion = await repo.findOne({ where: { id } });

  if (!reunion)
    return ["Reunión no encontrada"];

  if (reunion.estado !== "programada")
    return ["Solo puedes finalizar reuniones programadas"];

  reunion.estado = "realizada";
  reunion.fechaActualizacion = new Date();

  await repo.save(reunion);

  return [reunion];
}
