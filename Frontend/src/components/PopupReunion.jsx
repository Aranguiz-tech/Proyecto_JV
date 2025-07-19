import Form from './Form';
import '@styles/popup.css';
import CloseIcon from '@assets/XIcon.svg';

export default function PopupCancelarReunion({ show, setShow, data, action }) {
  const reunionData = data && data.length > 0 ? data[0] : {};

  const handleSubmit = (formData) => {
    action({
      id: reunionData.id,
      motivoCancelacion: formData.motivoCancelacion,
    });
  };

  return (
    <div>
      {show && (
        <div className="bg">
          <div className="popup">
            <button className="close" onClick={() => setShow(false)}>
              <img src={CloseIcon} alt="Cerrar" />
            </button>
            <Form
              title="Cancelar reunión"
              fields={[
                {
                  label: "Motivo de cancelación",
                  name: "motivoCancelacion",
                  defaultValue:
                    typeof reunionData.motivo === 'string'
                      ? reunionData.motivo
                      : '',
                  placeholder: "Ej: Lluvia intensa",
                  fieldType: 'input',
                  type: "text",
                  required: true,
                  maxLength: 255,
                },
              ]}
              onSubmit={handleSubmit}
              buttonText="Cancelar reunión"
              backgroundColor={'#fff'}
            />
          </div>
        </div>
      )}
    </div>
  );
}
