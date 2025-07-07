"use strict";
import { AppDataSource } from "../config/configDb.js";

export async function createSolicitudService(data) {
  try {
    const { tipo, motivo } = data;
    const SolRepo = AppDataSource.getRepository("Solicitud");

    const nuevaSolicitud = SolRepo.create({ tipo, motivo });

    await SolRepo.save(nuevaSolicitud);

    return [nuevaSolicitud, null];
  } catch (error) {
    console.error("Error al crear solicitud:", error);
    return [null, "Error del servidor"];
  }
}

export async function getSolicitudPorIdService(id) {
  try {
    const SolRepo = AppDataSource.getRepository("Solicitud");

    const solicitud = await SolRepo.findOne({ where: { id: Number(id) } });

    if (!solicitud) return [null, "Solicitud no encontrada"];

    return [solicitud, null];
  } catch (error) {
    console.error("Error al obtener solicitud:", error);
    return [null, "Error del servidor"];
  }
}

export async function getSolicitudesService() {
  try {
    const SolRepo = AppDataSource.getRepository("Solicitud");
    const solicitudes = await SolRepo.find();

    if (!solicitudes || solicitudes.length === 0) {
      return [null, "No se encontraron solicitudes"];
    }

    return [solicitudes, null];
  } catch (error) {
    console.error("Error al obtener solicitudes:", error);
    return [null, "Error del servidor"];
  }
}

export async function deleteSolicitudService(id) {
  try {
    const SolRepo = AppDataSource.getRepository("Solicitud");

    const solicitud = await SolRepo.findOne({ where: { id } });

    if (!solicitud) return [null, "Solicitud no encontrada"];

    await SolRepo.remove(solicitud);

    return [solicitud, null];
  } catch (error) {
    console.error("Error al eliminar solicitud:", error);
    return [null, "Error del servidor"];
  }
}

export async function updateSolicitudService(id, data) {
  try {
    const { tipo, motivo } = data;
    const SolRepo = AppDataSource.getRepository("Solicitud");

    const solicitud = await SolRepo.findOne({ where: { id } });

    if (!solicitud) return [null, "Solicitud no encontrada"];

    solicitud.tipo = tipo;
    solicitud.motivo = motivo;

    const actualizada = await SolRepo.save(solicitud);

    return [actualizada, null];
  } catch (error) {
    console.error("Error al actualizar solicitud:", error);
    return [null, "Error del servidor"];
  }
}

export async function updateEstadoSolicitudService(id, data) {
  try {
    const { estado, justificacionDeReachazo } = data;
    const SolRepo = AppDataSource.getRepository("Solicitud");

    const solicitud = await SolRepo.findOne({ where: { id } });

    if (!solicitud) return [null, "Solicitud no encontrada"];

    solicitud.estado = estado;

    if (estado !== "aprobado") {
      solicitud.justificacionDeReachazo =
        justificacionDeReachazo || "No se ha proporcionado una justificación de rechazo";
    }

    const actualizada = await SolRepo.save(solicitud);

    return [actualizada, null];
  } catch (error) {
    console.error("Error al actualizar estado:", error);
    return [null, "Error del servidor"];
  }
}
