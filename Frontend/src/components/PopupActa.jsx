import { useState } from "react";
import "@styles/popup.css";
import CloseIcon from "@assets/XIcon.svg";

const PopupActa = ({ show, setShow, onSave }) => {
  const [titulo, setTitulo] = useState("");
  const [contenido, setContenido] = useState("");

  const handleClose = () => setShow(false);

  const handleSubmit = () => {
    if (!titulo || !contenido) {
      alert("Completa todos los campos");
      return;
    }
    onSave({ titulo, contenido });
    setShow(false);
  };

  return (
    show && (
      <div className="bg">
        <div className="popup">
          <button className="close" onClick={handleClose}>
            <img src={CloseIcon} alt="Cerrar" />
          </button>
          <div className="form">
            <h1 className="title">Finalizar reunión y guardar acta</h1>

            <div className="container_inputs">
              <label className="label">Título del acta:</label>
              <input
                className="input"
                type="text"
                placeholder="Ej: Acta de reunión mensual"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
              />
            </div>

            <div className="container_inputs">
              <label className="label">Contenido del acta:</label>
              <textarea
                className="input"
                placeholder="Ej: Se trataron temas importantes para la comunidad..."
                value={contenido}
                onChange={(e) => setContenido(e.target.value)}
                rows={10}
              ></textarea>
            </div>

            <button onClick={handleSubmit} className="save-button">
              Guardar y finalizar reunión
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default PopupActa;
