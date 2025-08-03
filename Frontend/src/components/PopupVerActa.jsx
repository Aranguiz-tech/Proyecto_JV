import { useEffect, useState } from "react";
import { getActa } from "@services/acta.service.js";
import "@styles/popupver.css";

export default function PopupVerActa({ id, cerrar }) {
  const [acta, setActa] = useState(null);

  useEffect(() => {
    if (id) {
      getActa(id).then((res) => setActa(res.data));
    }
  }, [id]);

  if (!id || !acta) return null;

  return (
    <div className="popup-fondo" onClick={cerrar}>
      <div className="popup-ver" onClick={(e) => e.stopPropagation()}>
        <h2>Acta de la reunión</h2>

        <p><strong>Título:</strong> {acta.titulo}</p>
        <p><strong>Contenido:</strong> {acta.contenido}</p>

        <button onClick={cerrar}>Cerrar</button>
      </div>
    </div>
  );
}
