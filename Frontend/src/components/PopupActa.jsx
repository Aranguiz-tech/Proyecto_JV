import { useState } from "react";
import "@styles/popupAdaptable.css";
import CloseIcon from "@assets/XIcon.svg";

const PopupActa = ({ show, setShow, onSave }) => {
  const [titulo, setTitulo] = useState("");
  const [contenido, setContenido] = useState("");

  const handleClose = () => setShow(false);

  const handleSubmit = () => {
    if (titulo.trim() === "" || contenido.trim() === "") {
      alert("Completa todos los campos con información válida");
      return;
    }
    if (titulo.length > 100) {
      alert("El título no debe superar los 100 caracteres");
      return;
    }
    if (contenido.length > 1000) {
      alert("El contenido del acta es demasiado extenso");
      return;
    }
    onSave({ titulo: titulo.trim(), contenido: contenido.trim() });
    setShow(false);
  };

  return (
    show && (
      <div className="bg">
        <div className="popup">
          <button className="close" onClick={handleClose}>
            <img src={CloseIcon} alt="Cerrar" />
          </button>
          <form className="form" onSubmit={(e) => e.preventDefault()}>
            <h1 className="title">Finalizar reunión y guardar acta</h1>

            <div className="container_inputs">
              <label htmlFor="titulo">Título del acta:</label>
              <input
                name="titulo"
                type="text"
                placeholder="Ej: Acta de reunión mensual"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                className="input"
                style={{ maxWidth: "300px" }} 
              />
            </div>

            <div className="container_inputs">
              <label htmlFor="contenido">Contenido del acta:</label>
              <textarea
                name="contenido"
                placeholder="Ej: Se trataron temas importantes para la comunidad..."
                value={contenido}
                onChange={(e) => setContenido(e.target.value)}
                className="input"
                rows={6}
                style={{ minWidth: "300px", maxWidth: "500px" }} 
              />
            </div>

            <button type="button" onClick={handleSubmit}>
              Guardar y finalizar reunión
            </button>
          </form>
        </div>
      </div>
    )
  );
};

export default PopupActa;
