import { useState } from 'react';
import useGetReuniones from '@hooks/reunion/useGetReuniones';
import PopupVerActa from '@components/PopupVerActa';
import '@styles/reunionesList.css';

export default function VistaReuniones() {
  const { reuniones } = useGetReuniones();
  const [abierta, setAbierta] = useState(null);
  const [actaId, setActaId] = useState(null);

  const ahora = new Date();
  const ordenadas = reuniones.sort((a, b) => new Date(a.fecha) - new Date(b.fecha));
  const futura = ordenadas.find(r => new Date(r.fecha) > ahora && r.estado === 'programada');
  const otras = ordenadas.filter(r => r !== futura);

  return (
    <div className="reuniones-todo">
      {actaId && <PopupVerActa id={actaId} cerrar={() => setActaId(null)} />}

      {futura && (
        <div className="reunion-grande proxima">
          <h2> Próxima reunión</h2>
          <p><strong>Asunto:</strong> {futura.asunto}</p>
          <p className={`estado-text ${futura.estado}`}><strong>⏳ Estado:</strong> {futura.estado}</p>
          <p>Fecha: {futura.fecha}</p>
          <p>Lugar: {futura.lugar}</p>
        </div>
      )}

      <div className="otras-reuniones">
        <h3> Otras reuniones</h3>
        {otras.map(r => (
          <div
            key={r.id}
            className={`reunion-chica ${r.estado}`}
            onClick={() => setAbierta(abierta === r.id ? null : r.id)}
          >
            <p><strong> Asunto:</strong> {r.asunto}</p>
            <p className={`estado-text ${r.estado}`}><strong> Estado:</strong> {r.estado}</p>
            <p><strong> Fecha:</strong> {r.fecha}</p>

            {abierta === r.id && (
              <>
                <p><strong>Lugar:</strong> {r.lugar}</p>
                {r.estado === 'cancelada' && <p><strong>❌ Motivo:</strong> {r.motivo}</p>}
                {r.estado === 'realizada' && (
                  <button onClick={(e) => {
                    e.stopPropagation();
                    setActaId(r.id);
                  }}>
                    Ver acta
                  </button>
                )}
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
