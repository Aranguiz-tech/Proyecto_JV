import Form from './Form';
import '@styles/popup.css';
import CloseIcon from '@assets/XIcon.svg';

export default function PopupHogar({ show, setShow, data, action }) {
  const hogarData = data || {};
  
const handleSubmit = (formData) => {
  const nuevaDireccion = `${formData.tipo} ${formData.Direccion} #${formData.numero}`;
  action(hogarData.id, nuevaDireccion);
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
               buttonText="Actualizar hogar"
               onSubmit={handleSubmit}
              backgroundColor="#fff"
            />
          </div>
        </div>
      )}
    </div>
  );
}
