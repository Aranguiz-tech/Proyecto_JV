import { useState, useEffect } from 'react';
import { getReuniones } from '@services/reunion.service.js';
const useReunion = () => {
    const [reuniones, setReuniones] = useState([]);

    const fetchReunion = async () => {
        try {
           const response = await getReuniones();
           const formattedData = response.map(reunion => ({
            asunto: reunion.asunto,
            fecha: reunion.fecha 
        }));
        dataLogged(formattedData);
        setReuniones(formattedData);
    } catch (error) {
        console.error("Error: ", error);
    }
};
    useEffect(() => {
        fetchReunion();
    }, []);

    const dataLogged = (formattedData) => {
        try {
            const { rut } = JSON.parse(sessionStorage.getItem('usuario'));
            for(let i = 0; i < formattedData.length ; i++) {
                if(formattedData[i].rut === rut) {
                    formattedData.splice(i, 1);
                    break;
                }
            }
        } catch (error) {
            console.error("Error: ", error)
        }
    };

    return { reuniones, fetchUsers, setReuniones };
};

export default useReunion;