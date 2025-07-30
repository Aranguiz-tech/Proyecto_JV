import { cancelarReunion } from '@services/reunion.service';
import { showSuccessAlert, showErrorAlert } from '@helpers/sweetAlert';

const useUpdateReunion = (fetchReuniones, setIsPopupOpen, setDataReunion) => {
  const handleUpdate = async (formData) => {
    try {
      const { id, motivo, estado } = formData;

      const response = await cancelarReunion(id, { motivo, estado });

      if (response && response.estado === "cancelada") {
        showSuccessAlert("¡Reunión cancelada!", "La reunión fue cancelada correctamente.");
      } else if (response && response.estado === "realizada") {
        showSuccessAlert("¡Reunión realizada!", "La reunión fue marcada como realizada.");
      } else {
        showErrorAlert("Error", "No se pudo actualizar la reunión.");
        return;
      }

      fetchReuniones();
      setIsPopupOpen(false);
      setDataReunion([]);
    } catch (error) {
      console.error("Error al actualizar reunión:", error);
      showErrorAlert("Error", "Ocurrió un problema inesperado.");
    }
  };

  return { handleUpdate };
};

export default useUpdateReunion;
