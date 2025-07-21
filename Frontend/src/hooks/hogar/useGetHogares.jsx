import { useState, useEffect } from 'react';
import { getHogares } from '@services/hogar.service.js';

const useGetHogares = () => {
  const [hogares, setHogares] = useState([]);

  const fetchHogares = async () => {
    try {
      const response = await getHogares();
      setHogares(response);
    } catch (error) {
      console.error("Error al obtener hogares:", error);
    }
  };

  useEffect(() => {
    fetchHogares();
  }, []);

  return { hogares, fetchHogares, setHogares };
};

export default useGetHogares;
