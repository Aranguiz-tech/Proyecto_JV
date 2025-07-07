"use strict";
import {
  createSolicitudService,
  deleteSolicitudService,
  getSolicitudesService,
  getSolicitudPorIdService,
  updateEstadoSolicitudService,
  updateSolicitudService,
} from "../services/solicitud.service.js";
import {
  handleErrorClient,
  handleErrorServer,
  handleSuccess,
} from "../handlers/responseHandlers.js";

export async function createSolicitud(req, res) {
  try {
    const [nuevaSolicitud, error] = await createSolicitudService(req.body);

    if (error) return handleErrorClient(res, 400, error);

    handleSuccess(res, 201, "Solicitud creada correctamente", nuevaSolicitud);
  } catch (error) {
    handleErrorServer(res, 500, error.message);
  }
}

export async function getSolicitudPorId(req, res) {
  try {
    const { id } = req.params;
    const [solicitud, error] = await getSolicitudPorIdService(Number(id));

    if (error) return handleErrorClient(res, 404, error);

    handleSuccess(res, 200, "Solicitud encontrada", solicitud);
  } catch (error) {
    handleErrorServer(res, 500, error.message);
  }
}

export async function getSolicitudes(req, res) {
  try {
    const [solicitudes, error] = await getSolicitudesService();

    if (error) return handleErrorClient(res, 404, error);

    handleSuccess(res, 200, "Solicitudes encontradas", solicitudes);
  } catch (error) {
    handleErrorServer(res, 500, error.message);
  }
}

export async function deleteSolicitud(req, res) {
  try {
    const { id } = req.params;
    const [solicitud, error] = await deleteSolicitudService(Number(id));

    if (error) return handleErrorClient(res, 404, error);

    handleSuccess(res, 200, "Solicitud eliminada correctamente", solicitud);
  } catch (error) {
    handleErrorServer(res, 500, error.message);
  }
}

export async function updateSolicitud(req, res) {
  try {
    const { id } = req.params;
    const [solicitud, error] = await updateSolicitudService(Number(id), req.body);

    if (error) return handleErrorClient(res, 404, error);

    handleSuccess(res, 200, "Solicitud actualizada correctamente", solicitud);
  } catch (error) {
    handleErrorServer(res, 500, error.message);
  }
}

export async function updateEstadoSolicitud(req, res) {
  try {
    const { id } = req.params;
    const [solicitud, error] = await updateEstadoSolicitudService(Number(id), req.body);

    if (error) return handleErrorClient(res, 404, error);

    handleSuccess(res, 200, "Estado de la solicitud actualizado", solicitud);
  } catch (error) {
    handleErrorServer(res, 500, error.message);
  }
}
