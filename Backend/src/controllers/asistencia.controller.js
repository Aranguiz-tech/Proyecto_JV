"use strict";
import {
  createAsistenciaService,
  getAsistenciaService,
  getAllAsistenciasService,
  getAsistenciasPorReunionService,
  getAsistenciasPorHogarService
} from "../services/asistencia.service.js";

import {
  handleErrorClient,
  handleErrorServer,
  handleSuccess
} from "../handlers/responseHandlers.js";

export async function createAsistencia(req, res) {
  try {
    const { body } = req;
    const [newAsistencia, createError] = await createAsistenciaService(body);
    if (createError)
      return handleErrorClient(res, 400, "Error creando la asistencia", createError);

    handleSuccess(res, 201, "Asistencia creada correctamente", newAsistencia);
  } catch (error) {
    handleErrorServer(res, 500, error.message);
  }
}

export async function getAsistencia(req, res) {
  try {
    const { rut, id, email } = req.query;

    const [asistencia, errorAsistencia] = await getAsistenciaService({ rut, id, email });

    if (errorAsistencia) return handleErrorClient(res, 404, errorAsistencia);

    handleSuccess(res, 200, "Asistencia encontrada", asistencia);
  } catch (error) {
    handleErrorServer(res, 500, error.message);
  }
}

export async function getAllAsistencias(req, res) {
  try {
    const [asistencias, errorAsistencias] = await getAllAsistenciasService();

    if (errorAsistencias) return handleErrorClient(res, 404, errorAsistencias);

    asistencias.length === 0
      ? handleSuccess(res, 204)
      : handleSuccess(res, 200, "Asistencias encontradas", asistencias);
  } catch (error) {
    handleErrorServer(res, 500, error.message);
  }
}

export async function getAsistenciasPorReunion(req, res) {
  try {
    const { reunionId } = req.params;

    const [asistencias, errorAsistencias] = await getAsistenciasPorReunionService(reunionId);

    if (errorAsistencias) return handleErrorClient(res, 404, errorAsistencias);

    asistencias.length === 0
      ? handleSuccess(res, 204)
      : handleSuccess(res, 200, "Asistencias de la reunión encontradas", asistencias);
  } catch (error) {
    handleErrorServer(res, 500, error.message);
  }
}

export async function getAsistenciasPorHogar(req, res) {
  try {
    const { hogarId } = req.params;

    const [asistencias, errorAsistencias] = await getAsistenciasPorHogarService(hogarId);

    if (errorAsistencias) return handleErrorClient(res, 404, errorAsistencias);

    asistencias.length === 0
      ? handleSuccess(res, 204)
      : handleSuccess(res, 200, "Asistencias del hogar encontradas", asistencias);
  } catch (error) {
    handleErrorServer(res, 500, error.message);
  }
}
