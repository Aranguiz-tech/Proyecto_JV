import Form from './Form';
import '@styles/popup.css';
import CloseIcon from '@assets/XIcon.svg';

export default function PopupSolicitud({ show, setShow, data, action }) {
  const solicitudData = data && data.length > 0 ? data[0] : {};

  const handleSubmit = (formData) => {
    const payload = {
      id: solicitudData.id,
      tipo: formData.tipo,
      motivo: formData.motivo
    };
    action(payload);
  };

  return (
    <div>
      {show && (
        <div className="bg">
          <div className="popup">
            <button className="close" onClick={() => setShow(false)}>
              <img src={CloseIcon} />
            </button>
            <Form
              title="Editar solicitud"
              fields={[
                {
                  label: "Tipo",
                  name: "tipo",
                  defaultValue: solicitudData.tipo || "",
                  placeholder: 'Ej: Permiso',
                  fieldType: 'input',
                  type: "text",
                  required: true,
                  minLength: 3,
                  maxLength: 50,
                },
                {
                  label: "Motivo",
                  name: "motivo",
                  defaultValue: solicitudData.motivo || "",
                  placeholder: 'Ej: Razón del permiso',
                  fieldType: 'input',
                  type: "text",
                  required: true,
                  minLength: 5,
                  maxLength: 200,
                },
              ]}
              onSubmit={handleSubmit}
              buttonText="Guardar cambios"
              backgroundColor={'#fff'}
            />
          </div>
        </div>
      )}
    </div>
  );
}