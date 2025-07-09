import Form from './Form';
import '@styles/popup.css';
import CloseIcon from '@assets/XIcon.svg';

const tiposDocumentos = [
  { value: "Certificado de Residencia", label: "Certificado de Residencia" },
  { value: "Acta de reunion", label: "Acta de reunion" },
];

const motivosSolicitud = [
  { value: "Para fines personales", label: "Para fines personales" },
  { value: "Para fines laborales", label: "Para fines laborales" },
  { value: "Para fines escolares", label: "Para fines escolares" },
  { value: "Para fines judiciales", label: "Para fines judiciales" },
  { value: "para fines gubernamentales", label: "para fines gubernamentales" },
  { value: "para consultar", label: "para consultar" },
];

export default function PopupSolicitud({ show, setShow, data, action, mode = 'edit' }) {
  const solicitudData = data && data.length > 0 ? data[0] : {};

  const handleSubmit = (formData) => {
    const payload = {
      tipo: formData.tipo,
      motivo: formData.motivo,
    };

    if (mode === 'edit') {
      payload.id = solicitudData.id;
    }

    action(payload);
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
              title={mode === 'edit' ? "Editar solicitud" : "Crear solicitud"}
              fields={[
                {
                  label: "Tipo",
                  name: "tipo",
                  defaultValue: solicitudData.tipo || "",
                  fieldType: 'select',
                  options: tiposDocumentos,
                  required: true,
                },
                {
                  label: "Motivo",
                  name: "motivo",
                  defaultValue: solicitudData.motivo || "",
                  fieldType: 'select',
                  options: motivosSolicitud,
                  required: true,
                },
              ]}
              onSubmit={handleSubmit}
              buttonText={mode === 'edit' ? "Guardar cambios" : "Crear solicitud"}
              backgroundColor={'#fff'}
            />
          </div>
        </div>
      )}
    </div>
  );
}
