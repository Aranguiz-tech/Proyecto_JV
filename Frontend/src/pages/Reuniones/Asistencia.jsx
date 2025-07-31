import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getHogares } from "@services/hogar.service.js";
import { enviarAsistencia } from "@services/asistencia.service.js";
import { createActa } from "@services/acta.service.js";
import { finalizarReunion } from "@services/reunion.service.js";
import { showSuccessAlert, showErrorAlert } from "@helpers/sweetAlert.js";
import PopupActa from "@components/PopupActa";
import "@styles/users.css";

const Asistencia = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [hogares, setHogares] = useState([]);
  const [presentes, setPresentes] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    getHogares().then((res) => {
      if (res) setHogares(res);
      else showErrorAlert("Error", "No se pudieron cargar los hogares");
    });
  }, []);

  const marcar = (hogarId) => {
    if (presentes.includes(hogarId)) {
      setPresentes(presentes.filter((id) => id !== hogarId));
    } else {
      setPresentes([...presentes, hogarId]);
    }
  };

  const guardarAsistencia = async () => {
    try {
      for (const hogar of hogares) {
        const asistencia = presentes.includes(hogar.id) ? "presente" : "ausente";
        await enviarAsistencia({
          reunionId: parseInt(id),
          hogarId: hogar.id,
          asistencia,
        });
      }
      setShowPopup(true);
    } catch (error) {
      showErrorAlert("Error", "No se pudo guardar la asistencia.");
    }
  };

  const guardarActa = async ({ titulo, contenido }) => {
    try {
      const nuevaActa = {
        titulo,
        contenido,
        reunionId: parseInt(id),
      };

      const actaResponse = await createActa(nuevaActa);
      if (actaResponse.status !== "Success") throw new Error("Error al guardar el acta");

      const finalizarResponse = await finalizarReunion(id);
      if (finalizarResponse.status !== "Success") throw new Error("Error al finalizar reunión");

      showSuccessAlert("¡Reunión finalizada!", "Se guardó la asistencia y el acta.");
      navigate("/reuniones");
    } catch (error) {
      showErrorAlert("Error", "Ocurrió un error al guardar el acta o finalizar la reunión.");
    }
  };

  return (
    <div className="main-container">
      <div className="table-container">
        <div className="top-table">
          <h1 className="title-table">Asistencia de la Reunión #{id}</h1>
        </div>

        {hogares.length === 0 ? (
          <p>Cargando hogares...</p>
        ) : (
          <>
            <ul style={{ listStyle: "none", padding: 0 }}>
              {hogares.map((hogar) => (
                <li
                  key={hogar.id}
                  onClick={() => marcar(hogar.id)}
                  style={{
                    cursor: "pointer",
                    marginBottom: "10px",
                    padding: "10px",
                    borderRadius: "10px",
                    backgroundColor: presentes.includes(hogar.id) ? "#d4edda" : "#f8d7da",
                    color: presentes.includes(hogar.id) ? "#032407ff" : "#721c24",
                    border: "1px solid",
                    borderColor: presentes.includes(hogar.id) ? "#c3e6cb" : "#f5c6cb",
                  }}
                >
                  {hogar.direccion} — {presentes.includes(hogar.id) ? "Presente" : "Ausente"}
                </li>
              ))}
            </ul>

            <button className="save-button" onClick={guardarAsistencia}>
              Guardar Asistencia
            </button>

            <div style={{ marginTop: "20px" }}>
              <strong>Forma de marcar:</strong>
              <div style={{ display: "flex", gap: "20px", marginTop: "10px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <div style={{ width: "20px", height: "20px", backgroundColor: "#d4edda", border: "1px solid #c3e6cb" }}></div>
                  <span>Presente</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <div style={{ width: "20px", height: "20px", backgroundColor: "#f8d7da", border: "1px solid #f5c6cb" }}></div>
                  <span>Ausente</span>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {showPopup && (
        <PopupActa show={showPopup} setShow={setShowPopup} onSave={guardarActa} />
      )}
    </div>
  );
};

export default Asistencia;
