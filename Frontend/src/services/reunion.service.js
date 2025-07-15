import axios from './root.service.js';
import { formatCancelarReunion, formatCrearReunion, formatGetReunion} from '@helpers/formatData.js';

export async function createReunion(reunionData) {
    try {
        const { data } = await axios.post('/reunion/', reunionData);
        const formattedData = formatCrearReunion(data.data); 
        return formattedData;
    } catch (error) {
        console.error("Error en createReunion:", error);
        return error.response?.data || null;
        
    }
    
}
export async function getReuniones() {
    try {
        const { data } = await axios.get('/reunion/');
        const formattedData = data.data.map(formatGetReunion);
        console.log("data", data, formattedData);
        return formattedData;
    } catch (error) {
        return error.response.data;
    }
}
export async function deleteReunion(id) {
    try {
        const { data } = await axios.delete(`/reunion/${id}`);
        const formattedData = formatCancelarReunion(data.data);
        return formattedData;
    } catch (error) {
        console.error("Error al cancelar reunión:", error);
        return error.response?.data || null;
    }
}
