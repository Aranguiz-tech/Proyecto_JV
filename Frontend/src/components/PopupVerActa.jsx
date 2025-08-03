import { useEffect, useState, useRef } from "react";
import { getActa } from "@services/acta.service.js";
import "@styles/popupver.css";

export default function PopupVerActa({ id, cerrar }) {
  const [acta, setActa] = useState();
  const popupRef = useRef();

  useEffect(() => {
    if (id) {
      getActa(id).then((res) => {
        setActa(res.data);
      });
    }
  }, [id]);

  useEffect(() => {
    if (id && popupRef.current) {
      popupRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [id]);

  if (!id || !acta) return null;

  return (
    <div className="popup-fondo" onClick={cerrar}>
      <div className="popup-ver" onClick={(e) => e.stopPropagation()} ref={popupRef}>
        <h2 className="title"> Acta de la reunión</h2>

        <div className="fila">
          <p className="label">Título:</p>
          <p className="valor">{acta.titulo}</p>
        </div>

        <div className="fila">
          <p className="label">Contenido:</p>
          <p className="valor">{acta.contenido}</p>
        </div>

        <button onClick={cerrar}>Cerrar</button>
      </div>
    </div>
  );
}
