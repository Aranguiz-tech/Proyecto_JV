import Form from './Form';
import '@styles/popup.css';
import CloseIcon from '@assets/XIcon.svg';

const PopupCancelarReunion = ({ show, setShow, data, action }) => {
  const handleClose = () => setShow(false);

  const handleSubmit = (formData) => {
    const reunionCancelada = {
      ...formData,
      id: data[0].id,
      estado: "cancelada"
    };
    action(reunionCancelada);
  };

  const fields = [
    {
      label: "Motivo de cancelación",
      name: "motivo",
      placeholder: "Ej: Lluvia, poca asistencia esperada, etc.",
      fieldType: 'input',
      type: "text",
      required: true,
    },
  ];

  return (
    show && (
      <div className="bg">
        <div className="popup">
          <button className='close' onClick={handleClose}>
            <img src={CloseIcon} alt="Cerrar" />
          </button>
          <Form
            title="Cancelar reunión"
            fields={fields}
            buttonText="Cancelar reunión"
            onSubmit={handleSubmit}
            backgroundColor={'#fff'}
          />
        </div>
      </div>
    )
  );
};

export default PopupCancelarReunion;
