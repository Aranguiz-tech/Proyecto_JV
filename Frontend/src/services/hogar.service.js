import axios from './root.service.js';

export async function createHogar(hogarData) {
  try {
    const { data } = await axios.post('/hogar/', hogarData);
    console.log("Hogar creado:", data.data);
    return data;
  } catch (error) {
    console.error("Error en createHogar:", error);
    return error.response?.data || null;
  }
}

export async function getHogares() {
  try {
    const { data } = await axios.get('/hogar/');
    console.log("Hogares obtenidos:", data.data);
    return data.data;
  } catch (error) {
    console.error("Error en getHogares:", error);
    return error.response?.data || null;
  }
}

export async function deleteHogar(id) {
  try {
    const { data } = await axios.delete(`/hogar/${id}`);
    console.log("Hogar eliminado:", data.data);
    return data.data;
  } catch (error) {
    console.error("Error al eliminar hogar:", error);
    return error.response?.data || null;
  }
}

export async function updateHogar(id, direccion) {
  try {
    const { data } = await axios.patch(`/hogar/${id}`, { nuevaDireccion: direccion });
    console.log("Hogar actualizado:", data.data);
    return data.data;
  } catch (error) {
    console.error("Error al actualizar hogar:", error);
    return error.response?.data || null;
  }
}

