import { useState } from 'react'
import useGetReuniones from '@hooks/reunion/useGetReuniones'
import PopupVerActa from '@components/PopupVerActa'
import '@styles/reunionesList.css'

export default function VistaReuniones() {
  const { reuniones } = useGetReuniones()
  const [abiertaId, setAbiertaId] = useState(null)
  const [actaId, setActaId] = useState(null)

  const ahora = new Date()
  const ordenadas = reuniones.sort((a, b) => new Date(a.fecha) - new Date(b.fecha))
  const futura = ordenadas.find(r => new Date(r.fecha) > ahora && r.estado === 'programada')
  const otras = ordenadas.filter(r => r !== futura)

  const toggleReunion = (id) => {
    if (abiertaId === id) {
      setAbiertaId(null)
    } else {
      setAbiertaId(id)
    }
  }

  return (
    <section className="reuniones-lista">
      {actaId && <PopupVerActa id={actaId} cerrar={() => setActaId(null)} />}

      {futura && (
        <article className="reunion-grande futura">
          <h2>Próxima reunión</h2>
          <p><strong>Asunto:</strong> {futura.asunto}</p>
          <p className={`estado-text ${futura.estado}`}><strong>Estado:</strong> {futura.estado}</p>
          <p><strong>Fecha:</strong> {futura.fecha}</p>
          <p><strong>Lugar:</strong> {futura.lugar}</p>
        </article>
      )}

      <div className="reuniones-grid">
        {otras.map(r => (
          <article
            key={r.id}
            className={`reunion-card ${r.estado} ${abiertaId === r.id ? 'abierta' : ''}`}
            onClick={() => toggleReunion(r.id)}
          >
            <p><strong>Asunto:</strong> {r.asunto}</p>
            <p className={`estado-text ${r.estado}`}><strong>Estado:</strong> {r.estado}</p>
            <p><strong>Fecha:</strong> {r.fecha}</p>
            {abiertaId === r.id && (
              <>
                <p><strong>Lugar:</strong> {r.lugar}</p>
                {r.estado === 'cancelada' && <p><strong>❌ Motivo:</strong> {r.motivo}</p>}
                {r.estado === 'realizada' && (
                  <button onClick={(e) => {
                    e.stopPropagation()
                    setActaId(r.id)
                  }}>
                    Ver acta
                  </button>
                )}
              </>
            )}
          </article>
        ))}
      </div>
    </section>
  )
}
