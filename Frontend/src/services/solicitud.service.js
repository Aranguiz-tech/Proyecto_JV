import axios from './root.service.js';
import authAxios from './axiosConfig.js';

export async function getSolicitudes() {
  try {
    const { data } = await axios.get('/solicitud/');
    return data.data;
  } catch (error) {
    return error.response?.data || { message: "Error inesperado" };
  }
}

export async function getSolicitudPorId(id) {
  try {
    const { data } = await axios.get(`/solicitud/${id}`);
    return data.data;
  } catch (error) {
    return error.response?.data || { message: "Error inesperado" };
  }
}

export async function getSolicitudesPorUsuario(token) {
  try {
    const { data } = await axios.get('/solicitud/usuario', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data.data;
  } catch (error) {
    return error.response?.data || { message: 'Error inesperado' };
  }
}



export async function createSolicitud(solicitudData) {
  try {
    const { data } = await axios.post('/solicitud/', solicitudData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return data.data;
  } catch (error) {
    return error.response?.data || { message: "Error inesperado" };
  }
}

export async function updateSolicitud(id, newData) {
  try {
    const { data } = await axios.put(`/solicitud/${id}`, newData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return data.data;
  } catch (error) {
    return error.response?.data || { message: "Error inesperado" };
  }
}

export async function deleteSolicitud(id) {
  try {
    const { data } = await axios.delete(`/solicitud/${id}`);
    return data.data;
  } catch (error) {
    return error.response?.data || { message: "Error inesperado" };
  }
}

export async function updateEstadoSolicitud(id, estadoData) {
  try {
    const { data } = await axios.put(`/solicitud/estado/${id}`, estadoData);
    return data.data;
  } catch (error) {
    return error.response?.data || { message: "Error inesperado" };
  }
}
