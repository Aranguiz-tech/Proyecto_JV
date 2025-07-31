import axios from './root.service.js';

export async function createActa(actaData) {
  try {
    const { data } = await axios.post('/acta/', actaData);
    return data;
  } catch (error) {
    console.error("Error en createActa:", error);
    return error.response?.data || null;
  }
}

export async function getActa(id) {
  try {
    const { data } = await axios.get(`/acta/${id}`);
    return data;
  } catch (error) {
    console.error("Error en getActa:", error);
    return error.response?.data || null;
  }
}
