import { cancelarReunion } from '@services/reunion.service';
import { showSuccessAlert, showErrorAlert } from '@helpers/sweetAlert';

const useUpdateReunion = (fetchReuniones, setIsPopupOpen, setDataReunion) => {
  const handleUpdate = async (formData) => {
    try {
      const { id, motivoCancelacion } = formData;

      const response = await cancelarReunion(id, {
        motivo: motivoCancelacion, 
      });
      
      if (response && response.estado === "cancelada") {
        showSuccessAlert("¡Reunión cancelada!", "La reunión fue cancelada correctamente.");
        fetchReuniones();
        setIsPopupOpen(false);
        setDataReunion([]);
      } else {
        showErrorAlert("Error", "No se pudo cancelar la reunión.");
      }
    } catch (error) {
      console.error("Error al cancelar reunión:", error);
      showErrorAlert("Error", "Ocurrió un problema inesperado.");
    }
  };

  return { handleUpdate };
};

export default useUpdateReunion;
