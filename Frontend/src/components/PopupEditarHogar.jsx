import Form from './Form';
import '@styles/popup.css';
import CloseIcon from '@assets/XIcon.svg';

export default function PopupEditarHogar({ show, setShow, action, data }) {
  const handleSubmit = (formData) => {
    action(formData);
  };

  return (
    show && (
      <div className="bg">
        <div className="popup">
          <button className='close' onClick={() => setShow(false)}>
            <img src={CloseIcon} alt="cerrar" />
          </button>
          <Form
            title="Editar hogar"
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
                name: "direccion",
                fieldType: 'input',
                type: "text",
                required: true,
              },
              {
                label: "Número #",
                name: "numero",
                fieldType: 'input',
                type: "number",
                required: true,
              }
            ]}
            onSubmit={handleSubmit}
            buttonText="Editar hogar"
            initialData={data}
            backgroundColor={'#fff'}
          />
        </div>
      </div>
    )
  );
}
