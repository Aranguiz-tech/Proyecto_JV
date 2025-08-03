import { useEffect, useState } from 'react'
import { getAllHogares, getUsuariosPorHogar } from '@services/hogar.service'
import '@styles/popupver.css'

const PopupVistaHogares = ({ show, setShow, hogarId }) => {
  const [hogar, setHogar] = useState(null)
  const [usuarios, setUsuarios] = useState([])

  useEffect(() => {
    if (hogarId && show) {
      getAllHogares(hogarId).then((res) => {
        if (res) setHogar(res)
      })
      getUsuariosPorHogar(hogarId).then((res) => {
        if (res) setUsuarios(res)
      })
    }
  }, [hogarId, show])

  if (!show || !hogar) return null

  return (
    <div className="popup-fondo" onClick={() => setShow(false)}>
      <div className="popup-ver" onClick={(e) => e.stopPropagation()}>
        <h2 className="title">Detalles del hogar</h2>

        <div className="fila">
          <p className="label">Dirección:</p>
          <p className="valor">{hogar.direccion}</p>
        </div>

        <div className="fila">
          <p className="label">Residentes:</p>
          <p className="valor">{usuarios.length}</p>
        </div>

        {usuarios.length >= 1 && (
          <div className="residentes-lista">
            <div className="residente">
              <p className="rol">• {usuarios[0].rol}:</p>
              <p className="nombre">{usuarios[0].nombre} {usuarios[0].apellido}</p>
              <p className="email">{usuarios[0].email}</p>
            </div>
          </div>
        )}

        {usuarios.length >= 2 && (
          <div className="residentes-lista">
            <div className="residente">
              <p className="rol">• {usuarios[1].rol}:</p>
              <p className="nombre">{usuarios[1].nombre} {usuarios[1].apellido}</p>
              <p className="email">{usuarios[1].email}</p>
            </div>
          </div>
        )}

        {usuarios.length >= 3 && (
          <div className="residentes-lista">
            <div className="residente">
              <p className="rol">• {usuarios[2].rol}:</p>
              <p className="nombre">{usuarios[2].nombre} {usuarios[2].apellido}</p>
              <p className="email">{usuarios[2].email}</p>
            </div>
          </div>
        )}

        <button onClick={() => setShow(false)}>Cerrar</button>
      </div>
    </div>
  )
}

export default PopupVistaHogares
