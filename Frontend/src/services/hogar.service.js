import axios from './root.service.js';

export async function createHogar(hogarData) {
  try {
    const { data } = await axios.post('/hogar/', hogarData);
    return data;
  } catch (error) {
    console.error("Error en createHogar:", error);
    return error.response?.data || null;
  }
}

export async function getHogares() {
  try {
    const { data } = await axios.get('/hogar/');
    return data.data;
  } catch (error) {
    console.error("Error en getHogares:", error);
    return error.response?.data || null;
  }
}

export async function deleteHogar(id) {
  try {
    const { data } = await axios.delete(`/hogar/${id}`);
    return data.data;
  } catch (error) {
    console.error("Error al eliminar hogar:", error);
    return error.response?.data || null;
  }
}

export async function updateHogar(id, direccion) {
  try {
    const { data } = await axios.patch(`/hogar/${id}`, { nuevaDireccion: direccion });
    return data.data;
  } catch (error) {
    console.error("Error al actualizar hogar:", error);
    return error.response?.data || null;
  }
}

