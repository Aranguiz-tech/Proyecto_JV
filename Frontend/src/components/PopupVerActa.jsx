import { useEffect, useState } from "react";
import { getActa } from "@services/acta.service.js";
import "@styles/popup.css";
import CloseIcon from "@assets/XIcon.svg";

export default function PopupVerActa({ id, cerrar }) {
  const [acta, setActa] = useState(null);

  useEffect(() => {
    if (id) {
      getActa(id).then((res) => {
        if (res?.data) {
          setActa(res.data);
        }
      });
    }
  }, [id]);

  if (!id) return null;

  return (
    <div className="bg">
      <div className="popup">
        <button className="close" onClick={cerrar}>
          <img src={CloseIcon} alt="cerrar" />
        </button>
        <div className="form" style={{ padding: "35px", overflowY: "auto" }}>
          <h2 className="title" style={{ marginBottom: "20px" }}>
            Acta de la reunión
          </h2>
          {acta ? (
            <>
              <div style={{ marginBottom: "15px" }}>
                <p style={{ fontWeight: "bold", marginBottom: "5px" }}>
                  Título:
                </p>
                <p style={{ marginTop: 0 }}>{acta.titulo}</p>
              </div>
              <div>
                <p style={{ fontWeight: "bold", marginBottom: "5px" }}>
                  Contenido:
                </p>
                <p style={{ marginTop: 0, whiteSpace: "pre-wrap" }}>
                  {acta.contenido}
                </p>
              </div>
            </>
          ) : (
            <p>Cargando acta...</p>
          )}
        </div>
      </div>
    </div>
  );
}
