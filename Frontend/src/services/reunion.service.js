import axios from './root.service.js';

export async function createReunion(reunionData) {
  try {
    const { data } = await axios.post('/reunion/', reunionData);
    console.log("Reunión creada:", data.data);
    return data;
  } catch (error) {
    console.error("Error en createReunion:", error);
    return error.response?.data || null;
  }
}

export async function getReuniones() {
  try {
    const { data } = await axios.get('/reunion/');
    console.log("Reuniones obtenidas:", data.data);
    return data.data;
  } catch (error) {
    console.error("Error en getReuniones:", error);
    return error.response?.data || null;
  }
}

export async function deleteReunion(id) {
  try {
    const { data } = await axios.delete(`/reunion/${id}`);
    console.log("Reunión eliminada:", data.data);
    return data.data;
  } catch (error) {
    console.error("Error al eliminar reunión:", error);
    return error.response?.data || null;
  }
}

export async function cancelarReunion(id, motivo) {
  try {
    const { data } = await axios.patch(`/reunion/cancelar/${id}`, { motivo });
    console.log("Reunión cancelada:", data.data);
    return data.data;
  } catch (error) {
    console.error("Error al cancelar reunión:", error);
    return error.response?.data || null;
  }
}
