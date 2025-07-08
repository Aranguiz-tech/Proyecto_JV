import { useState } from "react";
import { deleteSolicitud } from "@services/solicitud.service";
import { deleteDataAlert, showErrorAlert, showSuccessAlert } from '@helpers/sweetAlert.js';

export function useDeleteSolicitud(fetchSolicitudes, setDataSolicitud) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleDelete = async (selectedData) => {
    if (selectedData.length === 0) return;

    try {
      const result = await deleteDataAlert(); // Confirmación del usuario
      if (result.isConfirmed) {
        setLoading(true);

        // Borra cada solicitud seleccionada (o modifica si backend soporta borrar en lote)
        for (const solicitud of selectedData) {
          const response = await deleteSolicitud(solicitud.id);
          if (response?.message) {
            setError(response.message);
            setLoading(false);
            return showErrorAlert('Error', response.message);
          }
        }

        showSuccessAlert('¡Eliminado!', 'La(s) solicitud(es) han sido eliminadas correctamente.');
        setDataSolicitud([]);
        await fetchSolicitudes(); // Refresca datos
        setLoading(false);
      } else {
        showErrorAlert('Cancelado', 'La operación ha sido cancelada.');
      }
    } catch (error) {
      setLoading(false);
      setError('Error al eliminar solicitud');
      console.error(error);
      showErrorAlert('Error', 'Ocurrió un error al eliminar la solicitud.');
    }
  };

  return { handleDelete, loading, error };
}
