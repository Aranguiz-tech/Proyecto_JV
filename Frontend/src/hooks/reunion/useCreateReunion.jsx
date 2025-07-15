import { useState } from 'react';
import { createReunion } from '@services/reunion.service.js';

const useCreateReunion = () => {
  const [reunion, setReunion] = useState(null);

  const fetchCreateReunion = async (data) => {
    try {
      const nueva = await createReunion(data); 
      setReunion(nueva);
    } catch (error) {
      console.error("Error al crear reunión:", error);
    }
  };

  return {
    reunion,
    fetchCreateReunion,
    setReunion,
  };
};

export default useCreateReunion;
