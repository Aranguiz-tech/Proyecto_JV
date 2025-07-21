import { deleteReunion } from '@services/reunion.service';
import { deleteDataAlert, showErrorAlert, showSuccessAlert } from '@helpers/sweetAlert';

const useDeleteReunion = (fetchReuniones, setDataReunion) => {
  const handleDelete = async (selectedReuniones) => {
    if (selectedReuniones.length === 0) return;

    try {
      const result = await deleteDataAlert();
      if (result.isConfirmed) {
        const response = await deleteReunion(selectedReuniones[0].id);

        if (response?.status === 'Client error') {
          return showErrorAlert('Error', response.details || 'No se pudo eliminar la reunión.');
        }

        showSuccessAlert('¡Reunión eliminada!', 'La reunión fue eliminada correctamente.');
        await fetchReuniones();
        setDataReunion([]);
      } else {
        showErrorAlert('Cancelado', 'La operación ha sido cancelada.');
      }
    } catch (error) {
      console.error("Error al eliminar reunión:", error);
      showErrorAlert("Error", "Ocurrió un problema inesperado.");
    }
  };

  return { handleDelete };
};

export default useDeleteReunion;
