"use strict";
import {
  createReunionService,
  getAllReunionesService,
  cancelarReunionService,
  deleteReunionService,
  finalizarReunionService
} from "../services/reunion.service.js";
import {
  handleErrorClient,
  handleErrorServer,
  handleSuccess
} from "../handlers/responseHandlers.js";
import { reunionValidation } from "../validations/reunion.validation.js";

export async function createReunion(req, res) {
  try {
    const { body } = req;

    const { error } = reunionValidation.validate(body);
    if (error) {
      return handleErrorClient(res, 400, "Error de validación", error.message);
    }
    const [nuevaReunion, errorCreacion] = await createReunionService(body);
    if (errorCreacion) {
      return handleErrorClient(res, 400, "Error al crear reunión", errorCreacion);
    }
    handleSuccess(res, 201, "Reunión creada correctamente", nuevaReunion);
  } catch (error) {
    handleErrorServer(res, 500, error.message);
  }
}

export async function getAllReuniones(req, res) {
  try {
    const [reuniones, error] = await getAllReunionesService();

    if (error)
      return handleErrorClient(res, 404, "Error al obtener reuniones", error);

    if (!reuniones.length)
      return handleSuccess(res, 204, "No hay reuniones registradas");

    handleSuccess(res, 200, "Reuniones obtenidas correctamente", reuniones);
  } catch (error) {
    handleErrorServer(res, 500, error.message);
  }
}

export async function cancelarReunion(req, res) {
  try {
    const { id } = req.params;
    const { motivo } = req.body;

    const [reunionCancelada, error] = await cancelarReunionService(id, motivo);

    if (error)
      return handleErrorClient(res, 400, "Error al cancelar reunión", error);

    handleSuccess(res, 200, "Reunión cancelada correctamente", reunionCancelada);
  } catch (error) {
    handleErrorServer(res, 500, error.message);
  }
}

export async function deleteReunion(req, res) {
  try {
    const { id } = req.params;

    const [reunionEliminada, error] = await deleteReunionService(id);

    if (error)
      return handleErrorClient(res, 404, "Error al eliminar reunión", error);

    handleSuccess(res, 200, "Reunión eliminada correctamente", reunionEliminada);
  } catch (error) {
    handleErrorServer(res, 500, error.message);
  }
}
export async function finalizarReunion(req, res) {
  try {
    const { id } = req.params;
    const { acta } = req.body;

    const resultado = await finalizarReunionService(id, acta);

    if (resultado.status === "Error") {
      return handleErrorClient(res, 400, "Error al finalizar reunión", resultado.message);
    }

    handleSuccess(res, 200, "Reunión finalizada correctamente", resultado.data);
  } catch (error) {
    handleErrorServer(res, 500, error.message);
  }
}
