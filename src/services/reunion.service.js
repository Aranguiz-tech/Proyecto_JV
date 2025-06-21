import { AppDataSource } from "../config/configDB.js";

export const createReunionService = async (datos) => {
  const { asunto, fechaInicio } = datos;

  if (!asunto || !fechaInicio) {
    return { error: "Faltan campos obligatorios" };
  }

  const reunionRepo = AppDataSource.getRepository("Reunion");

  const existeReunion = await reunionRepo.findOne({ where: { fechaInicio } });
  if (existeReunion) {
    return { error: "Ya existe una reunión programada para esta fecha" };
  }

  const hoy = new Date();
  const fecha = new Date(fechaInicio);

  if (fecha < hoy) {
    return { error: "La fecha de inicio no puede ser anterior a hoy" };
  }

  const nuevaReunion = reunionRepo.create({
    asunto,
    fechaInicio,
    estado: "programada",
  });

  await reunionRepo.save(nuevaReunion);

  return {
    id: nuevaReunion.id,
    asunto: nuevaReunion.asunto,
    fechaInicio: nuevaReunion.fechaInicio,
    estado: nuevaReunion.estado,
  };
};

export const getAllReunionesService = async () => {
  const reunionRepo = AppDataSource.getRepository("Reunion");

  const reuniones = await reunionRepo.find({
    order: { fechaInicio: "ASC" },
  });

  return reuniones;
};

export const cancelarReunionService = async (id, motivo) => {
  const reunionRepo = AppDataSource.getRepository("Reunion");

  const reunion = await reunionRepo.findOne({ where: { id } });
  if (!reunion) {
    return { error: "Reunión no encontrada" };
  }

  if (reunion.estado === "cancelada") {
    return { error: "La reunión ya está cancelada" };
  }

  reunion.estado = "cancelada";
  reunion.motivoCancelacion = motivo || "Sin motivo especificado";

  await reunionRepo.save(reunion);

  return {
    id: reunion.id,
    asunto: reunion.asunto,
    fechaInicio: reunion.fechaInicio,
    estado: reunion.estado,
    motivoCancelacion: reunion.motivoCancelacion
  };
};
