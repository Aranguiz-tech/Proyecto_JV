import axios from './root.service.js';
import { formatUserData } from '@helpers/formatData.js';

export async function getUsers() {
    try {
        const { data } = await axios.get('/usuario/');
        return data.data;
    } catch (error) {
        return error.response.data;
    }
}

export async function updateUser(data, rut) {
    try {
        const response = await axios.patch(`/usuario/${rut}`, data);
        console.log(response);
        return response.data.data;
    } catch (error) {
        console.log(error);
        return error.response.data;
    }
}

export async function deleteUser(rut) {
    try {
        const response = await axios.delete(`/usuario/${rut}`);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}
