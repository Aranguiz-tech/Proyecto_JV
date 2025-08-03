import { useEffect, useState } from "react";
import { getUsuariosPorHogar } from "@services/hogar.service.js";
import "@styles/popup.css";
import CloseIcon from "@assets/XIcon.svg";

export default function PopupVistaHogares({ show, setShow, hogarId }) {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    if (hogarId) {
      getUsuariosPorHogar(hogarId).then((res) => {
        setUsuarios(res);
      });
    }
  }, [hogarId]);

  if (!show) return null;

  return (
    <div className="bg">
      <div className="popup">
        <button className="close" onClick={() => setShow(false)}>
          <img src={CloseIcon} alt="cerrar" />
        </button>
        <div className="form" style={{ padding: "30px", overflowY: "auto" }}>
          <h2 className="title" style={{ marginBottom: "20px" }}>
            Personas del hogar
          </h2>
          {usuarios.length > 0 ? (
            usuarios.map((usuario, index) => (
              <div key={index} style={{ marginBottom: "15px" }}>
                <p><strong>Nombre:</strong> {usuario.nombre}</p>
                <p><strong>Apellido:</strong> {usuario.apellido}</p>
                <p><strong>Correo:</strong> {usuario.email}</p>
                <hr style={{ margin: "10px 0" }} />
              </div>
            ))
          ) : (
            <p>No hay usuarios en este hogar.</p>
          )}
        </div>
      </div>
    </div>
  );
}
