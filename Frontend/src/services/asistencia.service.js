import axios from './root.service.js';

export async function createAsistencia(asistenciaData) {
  try {
    const { data } = await axios.post('/asistencia/', asistenciaData);
    return data;
  } catch (error) {
    console.error("Error en createAsistencia:", error);
    return error.response?.data || null;
  }
}

export async function getAsistencias() {
  try {
    const { data } = await axios.get('/asistencia/');
    return data.data;
  } catch (error) {
    console.error("Error en getAsistencias:", error);
    return error.response?.data || null;
  }
}
export async function enviarAsistencia(asistenciaData) {
  try {
    const { data } = await axios.post('/asistencia/', asistenciaData);
    return data;
  } catch (error) {
    console.error("Error al enviar asistencia:", error);
    return error.response?.data || null;
  }
}


export async function getAsistencia(id) {
  try {
    const { data } = await axios.get(`/asistencia/${id}`);
    return data;
  } catch (error) {
    console.error("Error en getAsistencia:", error);
    return error.response?.data || null;
  }
}

export async function getAsistenciasPorHogar(hogarId) {
  try {
    const { data } = await axios.get(`/asistencia/hogar/${hogarId}`);
    return data;
  } catch (error) {
    console.error("Error en getAsistenciasPorHogar:", error);
    return error.response?.data || null;
  }
}

export async function getAsistenciasPorReunion(reunionId) {
  try {
    const { data } = await axios.get(`/asistencia/reunion/${reunionId}`);
    return data;
  } catch (error) {
    console.error("Error en getAsistenciasPorReunion:", error);
    return error.response?.data || null;
  }
}
