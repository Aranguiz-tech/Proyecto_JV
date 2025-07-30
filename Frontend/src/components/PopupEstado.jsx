import { useState, useEffect } from 'react';
import '@styles/popup.css';
import CloseIcon from '@assets/XIcon.svg';

export default function PopupEstado({ show, setShow, solicitud, action, onUpdated }) {
  const [estado, setEstado] = useState('');
  const [justificacion, setJustificacion] = useState('');

  useEffect(() => {
    if (solicitud) {
      setEstado(solicitud.estado || '');
      setJustificacion(solicitud.justificacionDeRechazo || '');
    }
  }, [solicitud]);

  const handleClose = () => {
    setShow(false);
    setEstado('');
    setJustificacion('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!solicitud?.id) return;

    const payload = {
      estado,
      justificacionDeRechazo:
        estado === 'rechazado'
          ? (justificacion.trim() || "No se ha proporcionado una justificación de rechazo")
          : null,
    };

    action(solicitud.id, payload)
      .then(() => onUpdated && onUpdated())
      .catch(console.error)
      .finally(() => handleClose());
  };

  if (!show) return null;

  return (
    <div className="bg">
      <div className="popup">
        <button className="close" onClick={handleClose}>
          <img src={CloseIcon} alt="cerrar" />
        </button>

        <form className="form" onSubmit={handleSubmit} autoComplete="off" style={{ backgroundColor: '#eef7ff' }}>
          <h1>Editar Estado</h1>

          <div className="container_inputs">
            <label htmlFor="estado">Estado:</label>
            <select
              id="estado"
              name="estado"
              value={estado}
              onChange={(e) => setEstado(e.target.value)}
              required
              className="input"
            >
              <option value="aprobado">Aprobado</option>
              <option value="rechazado">Rechazado</option>
            </select>
          </div>

          {estado === 'rechazado' && (
            <div className="container_inputs">
              <label htmlFor="justificacion">Justificación de rechazo:</label>
              <textarea
                id="justificacion"
                name="justificacion"
                value={justificacion}
                onChange={(e) => setJustificacion(e.target.value)}
                rows={4}
                className="input"
              />
            </div>
          )}

          <button type="submit">Guardar</button>
          <button type="button" onClick={handleClose} style={{ marginTop: '10px' }}>
            Cancelar
          </button>
        </form>
      </div>
    </div>
  );
}
