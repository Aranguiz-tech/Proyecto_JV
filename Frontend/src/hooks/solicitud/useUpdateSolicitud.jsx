import { useState } from "react";
import { updateSolicitud } from "@services/solicitud.service";
import { showErrorAlert, showSuccessAlert } from '@helpers/sweetAlert.js';
import { formatPostUpdateSolicitud } from '@helpers/formatData.js';  // <-- importar

const useUpdateSolicitud = (setSolicitudes) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [dataSolicitud, setDataSolicitud] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleClickUpdate = () => {
    if (dataSolicitud.length > 0) {
      setIsPopupOpen(true);
    }
  };

  const handleUpdate = async (id, updatedData) => {
    setLoading(true);
    try {
      const result = await updateSolicitud(id, updatedData);

      if (result?.message) {
        setError(result.message);
        showErrorAlert('Error', result.message);
        setLoading(false);
        return null;
      }

      showSuccessAlert('¡Actualizado!', 'La solicitud ha sido actualizada correctamente.');
      setIsPopupOpen(false);

      // Formatear la respuesta antes de actualizar el estado
      const formatted = formatPostUpdateSolicitud(result);

      setSolicitudes((prev) =>
        prev.map((sol) => (sol.id === id ? { ...sol, ...formatted } : sol))
      );

      setDataSolicitud([]);
      setLoading(false);
      return result;
    } catch (err) {
      setError('Error al actualizar solicitud');
      setLoading(false);
      showErrorAlert('Error', 'Ocurrió un error al actualizar la solicitud.');
      console.error(err);
      return null;
    }
  };

  return {
    handleClickUpdate,
    handleUpdate,
    isPopupOpen,
    setIsPopupOpen,
    dataSolicitud,
    setDataSolicitud,
    loading,
    error,
  };
};

export default useUpdateSolicitud;
