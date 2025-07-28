import { deleteHogar } from '@services/hogar.service.js';
import { deleteDataAlert, showErrorAlert, showSuccessAlert } from '@helpers/sweetAlert.js';

const useDeleteHogar = (fetchHogares, setDataHogar) => {
  const handleDelete = async (hogar) => {
    if (!hogar) return;

    try {
      const result = await deleteDataAlert();
      if (!result.isConfirmed) {
        return showErrorAlert('Cancelado', 'La operación ha sido cancelada.');
      }

      const response = await deleteHogar(hogar.id);

      if (response.status === 'Success') {
        showSuccessAlert('¡Eliminado!', 'El hogar ha sido eliminado correctamente.');
        fetchHogares();
        setDataHogar(null);
      } else {
        showErrorAlert('Error', response.message || 'No se pudo eliminar el hogar.');
      }
    } catch (error) {
      showErrorAlert('Error', 'Ocurrió un problema inesperado.');
    }
  };

  return { handleDelete };
};

export default useDeleteHogar;
