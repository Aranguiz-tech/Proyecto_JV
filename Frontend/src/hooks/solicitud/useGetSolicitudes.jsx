import { useEffect, useState } from "react";
import { getSolicitudes } from "@services/solicitud.service";

export default function useGetSolicitudes() {
  const [solicitudes, setSolicitudes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSolicitudes = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await getSolicitudes();

      if (!Array.isArray(result)) {
        setError(result.message || "Error al obtener solicitudes");
        setSolicitudes([]);
      } else {
        setSolicitudes(result);
      }
    } catch (err) {
      setError("Error inesperado al obtener solicitudes");
      setSolicitudes([]);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSolicitudes();
  }, []);

  return { solicitudes, fetchSolicitudes, setSolicitudes, loading, error };
}
