import { createReunion } from '@services/reunion.service.js';
import Form from '@components/Form';
import { showErrorAlert, showSuccessAlert } from '@helpers/sweetAlert.js';
import '@styles/form.css';

const CrearReunion = () => {
  const handleSubmit = async (data) => {
    try {
      console.log("Datos enviados:", data); 
      const response = await createReunion(data);

      if (response.status === 'Success') {
        showSuccessAlert('¡Reunión creada!', 'La reunión fue agendada correctamente.');
      } else {
        if (response.details === 'Ya existe una reunión programada para esta fecha') {
          showErrorAlert('Fecha duplicada', 'Ya hay una reunión programada para ese día.');
        } else if (response.details === 'La fecha de inicio no puede ser anterior a hoy') {
          showErrorAlert('Fecha inválida', 'No puedes agendar reuniones en fechas pasadas.');
        } else {
          showErrorAlert('Error', response.message || 'No se pudo crear la reunión.');
        }
      }
    } catch (error) {
      console.error('Error al crear reunión:', error);
      showErrorAlert('Error', 'Ocurrió un problema inesperado.');
    }
  };

  return (
    <main className="container">
      <Form
        title="Establecer próxima reunión"
        fields={[
          {
            label: "Asunto",
            name: "asunto",
            placeholder: "Ej: Reunión mensual de comunidad",
            fieldType: 'input',
            type: "text",
            required: true,
            maxLength: 255,
          },
          {
            label: "Fecha de la reunión",
            name: "fechaInicio",
            fieldType: 'input',
            type: "date",
            required: true,
          }
        ]}
        buttonText="Crear reunión"
        onSubmit={handleSubmit}
      />
    </main>
  );
};

export default CrearReunion;
