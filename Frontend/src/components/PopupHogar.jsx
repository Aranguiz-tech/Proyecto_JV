import Form from './Form';
import '@styles/popup.css';
import CloseIcon from '@assets/XIcon.svg';

export default function PopupHogar({ show, setShow, data, action }) {
  const hogarData = data || {};
  

  const handleSubmit = (formData) => {
    action(hogarData.id, formData.nuevaDireccion);

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
              title="Actualizar hogar"
              fields={[
                {
                  label: "Nueva dirección",
                  name: "nuevaDireccion",
                  fieldType: "textarea",
                  placeholder: "Ej: Psje. rene olivares #1235",
                  required: true,
                  minLength: 5,
                  maxLength: 150,
                },
              ]}
              onSubmit={handleSubmit}
              buttonText="Actualizar hogar"
              backgroundColor="#fff"
            />
          </div>
        </div>
      )}
    </div>
  );
}
