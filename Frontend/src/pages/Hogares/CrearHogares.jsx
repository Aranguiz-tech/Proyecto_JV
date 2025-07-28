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
            label: "Tipo",
            name: "tipo",
            fieldType: 'select',
            options: [
              { value: "Psj.", label: "Psj." },
              { value: "Av.", label: "Av." }
            ],
            required: true,
            maxLength: 255,
          },
          {
            label: "Dirección",
            name: "Direccion",
            fieldType: 'input',
            type: "text",
            required: true,
            maxLength: 50,
          },
          {
            label: "Número #",
            name: "numero",
            fieldType: 'input',
            type: "number",
            required: true,
            min: 1,
          }
        ]}
        buttonText="Crear hogar"
        onSubmit={handleSubmit}
      />
    </main>
  );
};

export default CrearHogar;
