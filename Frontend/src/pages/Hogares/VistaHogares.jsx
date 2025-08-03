import { useState } from 'react'
import useGetHogares from '@hooks/hogar/useGetHogares'
import Search from '@components/Search'
import HogaresList from '@components/HogaresList'
import PopupVistaHogares from '@components/PopupVistaHogares'
import '@styles/verHogares.css'

const VistaHogares = () => {
  const { hogares } = useGetHogares()
  const [direccion, setDireccion] = useState('')
  const [hogarId, setHogarId] = useState(null)
  const [verPopup, setVerPopup] = useState(false)

  const cambiarFiltro = (e) => {
    setDireccion(e.target.value)
  }

  const seleccionar = (seleccionado) => {
    if (seleccionado[0]) {
      setHogarId(seleccionado[0].id)
      setVerPopup(true)
    }
  }

  return (
    <div className="verhogar-contenedor">
      <h1 className="titulo-hogar">Listado de hogares</h1>

      <div className="buscador-hogar">
        <Search
          value={direccion}
          onChange={cambiarFiltro}
          placeholder="Filtrar por dirección"
        />
      </div>

      <div className="verhogar-listado">
        <HogaresList
          data={hogares}
          filter={direccion}
          onSelectionChange={seleccionar}
        />
      </div>

      <PopupVistaHogares
        show={verPopup}
        setShow={setVerPopup}
        hogarId={hogarId}
      />
    </div>
  )
}

export default VistaHogares
