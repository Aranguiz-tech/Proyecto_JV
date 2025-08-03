import Form from './Form';
import '@styles/popup.css';
import CloseIcon from '@assets/XIcon.svg';

export default function PopupAgregarHogar({ show, setShow, action }) {
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
              title="Agregar nuevo hogar"
              fields={[
                {
                  label: "Tipo",
                  name: "tipo",
                  fieldType: 'select',
                  required: true,
                  options: [
                    { label: "Psj.", value: "Psj." },
                    { label: "Av.", value: "Av." }
                  ]
                },
                {
                  label: "Dirección",
                  name: "Direccion",
                  fieldType: 'input',
                  type: "text",
                  required: true,
                  maxLength: 60,
                  pattern: /^[a-zA-Z0-9\sáéíóúÁÉÍÓÚñÑ.-]+$/,
                  patternMessage: "Solo letras, números y espacios"
                },
                {
                  label: "Número #",
                  name: "numero",
                  fieldType: 'input',
                  type: "number",
                  required: true,
                  min: 1
                }
              ]}
              onSubmit={handleSubmit}
              buttonText="Crear hogar"
              backgroundColor={'#fff'}
            />
          </div>
        </div>
      )}
    </div>
  );
}
