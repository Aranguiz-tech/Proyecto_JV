import { useState, useEffect } from 'react';
import { createReunion } from '@services/reunion.service.js';

const usecreateReunion = () => {
    const [Reunion, setcreateReunion] = useState('');

     const fetchcreateReunion = async () => {
        try {
           const response = await createReunion();
           const formattedData = response.map(reunion => ({
            asunto: reunion.asunto,
            fecha: reunion.fecha 
        }));
        dataLogged(formattedData);
        setcreateReunion(formattedData);
    } catch (error) {
        console.error("Error: ", error);
    }
};
    useEffect(() => {
        fetchcreateReunion();
    }, []);
    return {
    Reunion,
    fetchcreateReunion,
    setcreateReunion,
    };
};

export default usecreateReunion;