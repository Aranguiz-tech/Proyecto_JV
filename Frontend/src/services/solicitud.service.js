import axios from './root.service.js';

/* Obtener todas las solicitudes */
export async function getSolicitudes() {
  try {
    const { data } = await axios.get('/solicitud/');
    return data.data;
  } catch (error) {
    return error.response?.data || { message: "Error inesperado" };
  }
}

/* Obtener una solicitud por ID */
export async function getSolicitudPorId(id) {
  try {
    const { data } = await axios.get(`/solicitud/${id}`);
    return data.data;
  } catch (error) {
    return error.response?.data || { message: "Error inesperado" };
  }
}

/* Crear una nueva solicitud */
export async function createSolicitud(solicitudData) {
  try {
    const { data } = await axios.post('/solicitud/', solicitudData);
    return data.data;
  } catch (error) {
    return error.response?.data || { message: "Error inesperado" };
  }
}

export async function updateSolicitud(id, newData) {
  try {
    const { data } = await axios.put(`/solicitud/${id}`, newData);
    return data.data;
  } catch (error) {
    return error.response?.data || { message: "Error inesperado" };
  }
}


/* Eliminar una solicitud */
export async function deleteSolicitud(id) {
  try {
    const { data } = await axios.delete(`/solicitud/${id}`);
    return data.data;
  } catch (error) {
    return error.response?.data || { message: "Error inesperado" };
  }
}

/* Actualizar el estado de una solicitud */
export async function updateEstadoSolicitud(id, estadoData) {
  try {
    const { data } = await axios.put(`/solicitud/estado/${id}`, estadoData);
    return data.data;
  } catch (error) {
    return error.response?.data || { message: "Error inesperado" };
  }
}
