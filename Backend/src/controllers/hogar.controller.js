"use strict";
import {
  createHogarService,
  getAllHogaresService,
  getHogarService,
  updateHogarService,
  deleteHogarService,
  getUsuariosPorHogarService
} from "../services/hogar.service.js";

import {
  handleErrorClient,
  handleErrorServer,
  handleSuccess,
} from "../handlers/responseHandlers.js";

import {
  hogarValidation,
} from "../validations/hogar.validation.js";

export async function createHogar(req, res) {
  try {
    const { tipo, Direccion, numero} = req.body;

    const { error } = hogarValidation.validate({ tipo, Direccion, numero });
    if (error)
      return handleErrorClient(res, 400, "Error de validación", error.message);

    const direccion = `${tipo} ${Direccion} #${numero}`;
    const [hogar, hogarError] = await createHogarService(direccion);

    if (hogarError)
      return handleErrorClient(res, 400, "Error al crear hogar", hogarError);

    return handleSuccess(res, 201, "Hogar creado exitosamente", hogar);
  } catch (error) {
    return handleErrorServer(res, 500, error.message);
  }
}

export async function getAllHogares(req, res) {
  try {
    const [hogares, error] = await getAllHogaresService();

    if (error)
      return handleErrorClient(res, 404, "No se pudieron obtener hogares", error);

    if (!hogares.length)
      return handleSuccess(res, 204, "No hay hogares registrados");

    return handleSuccess(res, 200, "Hogares obtenidos correctamente", hogares);
  } catch (error) {
    handleErrorServer(res, 500, error.message);
  }
}

export async function getHogar(req, res) {
  try {
    const { id } = req.params;

    const [hogar, hogarError] = await getHogarService(id);

    if (hogarError)
      return handleErrorClient(res, 404, "Hogar no encontrado", hogarError);

    return handleSuccess(res, 200, "Hogar encontrado", hogar);
  } catch (error) {
    handleErrorServer(res, 500, error.message);
  }
}

export async function updateHogar(req, res) {
  try {
    const { id } = req.params;
    const { nuevaDireccion } = req.body;

    if (!nuevaDireccion) {
      return handleErrorClient(res, 400, "Error de validación", "La nueva dirección es obligatoria");
    }

    const [hogarActualizado, errorUpdate] = await updateHogarService(id, nuevaDireccion);

    if (errorUpdate) {
      return handleErrorClient(res, 400, "Error al actualizar hogar", errorUpdate);
    }

    return handleSuccess(res, 200, "Hogar actualizado correctamente", hogarActualizado);
  } catch (error) {
    handleErrorServer(res, 500, error.message);
  }
}
export async function deleteHogar(req, res) {
  try {
    const { id } = req.params;

    const [hogarEliminado, errorDelete] = await deleteHogarService(id);

    if (errorDelete) {
      return handleErrorClient(res, 404, "Error al eliminar hogar", errorDelete);
    }

    return handleSuccess(res, 200, "Hogar eliminado correctamente", hogarEliminado);
  } catch (error) {
    handleErrorServer(res, 500, error.message);
  }
}

export async function getUsuariosPorHogar(req, res) {
  try {
    const { id } = req.params
    const [usuarios, error] = await getUsuariosPorHogarService(id)
    if (error) {
      return res.status(404).json({ status: "Error", message: error })
    }
    return res.status(200).json({ status: "Success", data: usuarios })
  } catch (error) {
    console.error("Error en getUsuariosPorHogar:", error)
    return res.status(500).json({ status: "Error", message: "Error del servidor" })
  }
}
