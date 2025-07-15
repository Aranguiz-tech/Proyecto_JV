import axios from './root.service.js';
import { formatCancelarReunion, formatCrearReunion, formatGetReunion} from '@helpers/formatData.js';

export async function createReunion() {
    try {
        const { data } = await axios.post('/reuniones/');
        const formattedData = data.data.map(formatCrearReunion);
        return formattedData;
    } catch (error) {
        return error.response.data;
    }
}
export async function getReuniones() {
    try {
        const { data } = await axios.get('/reuniones/');
        const formattedData = data.data.map(formatGetReunion);
        return formattedData;
    } catch (error) {
        return error.response.data;
    }
}
export async function deleteReunion() {
    try {
        const { data } = await axios.delete('/reuniones/');
        const formattedData = data.data.map(formatCancelarReunion);
        return formattedData;
    } catch (error) {
        return error.response.data;
    }
}