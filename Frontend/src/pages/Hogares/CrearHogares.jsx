import { createHogar } from '@services/hogar.service.js';
import Form from '@components/Form';
import { showErrorAlert, showSuccessAlert } from '@helpers/sweetAlert.js';
import '@styles/form.css';

const CrearHogar = () => {
  const handleSubmit = async (data) => {
    try {
      const response = await createHogar(data);

      if (response.status === 'Success') {
        showSuccessAlert('¡Hogar creado!', 'El hogar fue registrado correctamente.');
      } else {
        showErrorAlert('Error', response.message || 'No se pudo crear el hogar.');
      }
    } catch (error) {
      console.error('Error al crear hogar:', error);
      showErrorAlert('Error', 'Ocurrió un problema inesperado.');
    }
  };

  return (
    <main className="container">
      <Form
        title="Crear hogar"
        fields={[
          {
            label: "Dirección",
            name: "direccion",
            placeholder: "Ej: psje Acotango #0343",
            fieldType: 'input',
            type: "text",
            required: true,
            maxLength: 255,
          }
        ]}
        buttonText="Crear hogar"
        onSubmit={handleSubmit}
      />
    </main>
  );
};

export default CrearHogar;
