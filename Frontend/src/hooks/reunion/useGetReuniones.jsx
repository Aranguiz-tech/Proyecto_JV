import { useState } from 'react';
import { getReuniones } from '@services/reunion.service.js';

const useGetReuniones = () => {
  const [reuniones, setReuniones] = useState([]);

  const fetchReuniones = async () => {
    try {
      const response = await getReuniones();
      setReuniones(response);
    } catch (error) {
      console.error("Error al obtener reuniones:", error);
    }
  };

  return {
    reuniones,
    fetchReuniones,
    setReuniones,
  };
};

export default useGetReuniones;
