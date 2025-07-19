import { useState, useEffect } from 'react';
import { getReuniones } from '@services/reunion.service.js';

const useGetReuniones = () => {
  const [reuniones, setReuniones] = useState([]);

  const fetchReuniones = async () => {
    try {
      const response = await getReuniones();

      const formatted = response.map(reunion => {
        let motivo = '-';

        if (reunion.motivoCancelacion) { 
          if (typeof reunion.motivoCancelacion === 'string') {
            try {
              const parsed = JSON.parse(reunion.motivoCancelacion);
              motivo = parsed.motivo || reunion.motivoCancelacion;
            } catch (e) {
              motivo = reunion.motivoCancelacion;
            }
          }
        
          if (typeof reunion.motivoCancelacion === 'object') {
            motivo = reunion.motivoCancelacion.motivo || '-';
          }
        }

        return {
          id: reunion.id,
          asunto: reunion.asunto,
          fecha: reunion.fechaInicio,
          estado: reunion.estado,
          motivo,
        };
      });

      setReuniones(formatted);
    } catch (error) {
      console.error("Error al obtener reuniones:", error);
    }
  };

  useEffect(() => {
    fetchReuniones();
  }, []);

  return { reuniones, fetchReuniones, setReuniones };
};

export default useGetReuniones;
