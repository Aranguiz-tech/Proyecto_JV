import Form from './Form';
import '@styles/popup.css';
import CloseIcon from '@assets/XIcon.svg';

export default function PopupAgregarReunion({ show, setShow, action }) {
  const handleSubmit = (formData) => {
    action(formData);
  };

  return (
    <div>
      {show && (
        <div className="bg">
          <div className="popup">
            <button className="close" onClick={() => setShow(false)}>
              <img src={CloseIcon} alt="cerrar" />
            </button>
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
                  pattern: /^(?!\s*$)[a-zA-Z0-9\sáéíóúÁÉÍÓÚñÑ.,:;!?()"-]+$/,
                  patternMessage: "Solo letras, números y signos básicos",
                },
                {
                  label: "Fecha de la reunión",
                  name: "fechaInicio",
                  fieldType: 'input',
                  type: "date",
                  required: true,
                },
                {
                  label: "Lugar de la reunión",
                  name: "lugar",
                  fieldType: 'select',
                  required: true,
                  options: [
                    { label: "Parque Ecuador", value: "Parque Ecuador" },
                    { label: "Museo parque Ecuador", value: "Museo parque Ecuador" }
                  ]
                }
              ]}
              onSubmit={handleSubmit}
              buttonText="Crear reunión"
              backgroundColor={'#fff'}
            />
          </div>
        </div>
      )}
    </div>
  );
}
