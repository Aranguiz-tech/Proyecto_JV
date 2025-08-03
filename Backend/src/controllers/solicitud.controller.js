"use strict";
import {
  createSolicitudService,
  deleteSolicitudService,
  getSolicitudesPorRutService,
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
import {
  solicitudBodyValidation,
  solicitudQueryValidation,
} from "../validations/solicitud.validation.js";
import{
  solicitudEstadoQueryValidation,
  updateEstadoBodyValidation,
} from "../validations/updateEstado.validation.js";

export async function createSolicitud(req, res) {
  try {
    const solicitudData = {
      ...req.body,
      usuario: { id: req.user.id } ,
      archivoNombre: req.file ? req.file.filename : null,
      archivoRuta: req.file ? req.file.path : null,
    };

    console.log("Datos recibidos en createSolicitud:", solicitudData);

    const { error : bodyError } = solicitudBodyValidation.validate(solicitudData);
    console.log(bodyError);
    if (bodyError){
      return handleErrorClient(res, 400, "Error en los datos", bodyError.message);
    };
    
    const [nuevaSolicitud, createError] = await createSolicitudService(solicitudData);

    if (createError){
      return handleErrorClient(res, 400, "Error modificando al usuario", updateError);
    };

    handleSuccess(res, 201, "Solicitud creada correctamente", nuevaSolicitud);
  } catch (error) {
    handleErrorServer(res, 500, error.message);
  }
};

export async function getSolicitudPorId(req, res) {
  try {
    const { id } = req.params;

    const { err } = solicitudQueryValidation.validate({ id });
    if (err){ 
      return handleErrorClient(res, 400, "Error de validación", error.message);
    }

    const [solicitud, error] = await getSolicitudPorIdService(Number(id));

    if (error) return handleErrorClient(res, 404, error);

    handleSuccess(res, 200, "Solicitud encontrada", solicitud);
  } catch (error) {
    handleErrorServer(res, 500, error.message);
  }
}

export async function getSolicitudesPorUser(req, res) {
  try {
    const rut = req.user?.rut;
    const { err } = solicitudQueryValidation.validate({ rut });

    if (err){ 
      return handleErrorClient(res, 400, "Error de validación", error.message);
    }

    const [solicitudes, error] = await getSolicitudesPorRutService(rut);

    if (error) return handleErrorServer(res, error, "Error al obtener solicitudes");

    return res.status(200).json({
      message: "Solicitudes obtenidas correctamente",
      data: solicitudes
    });
  } catch (err) {
    return handleErrorServer(res, err, "Error inesperado al obtener solicitudes");
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

    const { err } = solicitudQueryValidation.validate({ id });
    if (err){ 
      return handleErrorClient(res, 400, "Error de validación", error.message);
    }

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

    const { err } = solicitudQueryValidation.validate({ id });
    if (err){ 
      return handleErrorClient(res, 400, "Error de validación", error.message);
    }

    const updatedData = {
      ...req.body,
      archivoNombre: req.file ? req.file.filename : null,
      archivoRuta: req.file ? req.file.path : null,
    };

    const { errorB : bodyError } = solicitudBodyValidation.validate(updatedData);

    if (bodyError){
      return handleErrorClient(res, 400, "Error en los datos", bodyError.message);
    };

    const [solicitud, error] = await updateSolicitudService(Number(id), updatedData);

    if (error) return handleErrorClient(res, 404, error);

    handleSuccess(res, 200, "Solicitud actualizada correctamente", solicitud);
  } catch (error) {
    handleErrorServer(res, 500, error.message);
  }
}

export async function updateEstadoSolicitud(req, res) {
  try {
    const { id } = req.params;

    const { err } = solicitudEstadoQueryValidation.validate({ id });
    if (err){ 
      return handleErrorClient(res, 400, "Error de validación", error.message);
    }

    const solicitudData = {
      estado: req.body.estado,
      justificacionDeRechazo: req.body.justificacionDeRechazo,
    };

    const { error : bodyError } = updateEstadoBodyValidation.validate(solicitudData);
    
    if (bodyError){
      return handleErrorClient(res, 400, "Error en los datos", bodyError.message);
    };

    const [solicitud, error] = await updateEstadoSolicitudService(Number(id), req.body);
    

    if (error) return handleErrorClient(res, 404, error);

    handleSuccess(res, 200, "Estado de la solicitud actualizado", solicitud);
  } catch (error) {
    handleErrorServer(res, 500, error.message);
  }
}
