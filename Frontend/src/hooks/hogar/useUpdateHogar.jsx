import { updateHogar } from '@services/hogar.service.js';
import { showErrorAlert, showSuccessAlert } from '@helpers/sweetAlert.js';

const useUpdateHogar = (fetchHogares, setIsPopupOpen, setDataHogar) => {
  const handleUpdate = async (id, direccion) => {
    console.log("direccion", direccion);
    try {
      const response = await updateHogar(id, direccion);

      if (response?.status === 'Success') {
        await showSuccessAlert('¡Actualizado!', 'La dirección del hogar ha sido modificada correctamente.');
        fetchHogares();
        setDataHogar(null);
        setIsPopupOpen(false);
      } else {
        await showErrorAlert('Error', response?.message || 'No se pudo actualizar el hogar.');
      }
    } catch (error) {
      await showErrorAlert('Error', 'Ocurrió un problema inesperado.');
    }
  };

  return { handleUpdate };
};

export default useUpdateHogar;
