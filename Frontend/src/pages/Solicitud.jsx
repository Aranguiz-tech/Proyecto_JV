import { useState, useEffect, useCallback, useContext } from 'react';

import Table from '@components/Table';
import Search from '@components/Search';
import PopupSolicitud from '@components/PopupSolicitud';
import PopupArchivo from '@components/PopupArchivo';
import PopupDocumento from '@components/PopupDocumento';

import UpdateIcon from '@assets/updateIcon.svg';
import UpdateIconDisable from '@assets/updateIconDisabled.svg';
import DeleteIcon from '@assets/deleteIcon.svg';
import DeleteIconDisable from '@assets/deleteIconDisabled.svg';

import '@styles/solicitud.css';

import {
  getSolicitudes,
  updateSolicitud,
  deleteSolicitud,
  createSolicitud,
} from '@services/solicitud.service.js';

import { AuthContext } from '@context/AuthContext';

function formatearFecha(isoDate) {
  if (!isoDate) return '';
  const fecha = new Date(isoDate);
  return fecha.toLocaleString('es-CL', {
    hour: '2-digit',
    minute: '2-digit',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour12: false,
  });
}

function puedeEditarSolicitud(fechaCreacionISO) {
  if (!fechaCreacionISO) return false;
  const fechaCreacion = new Date(fechaCreacionISO);
  const ahora = new Date();
  const diferenciaMs = ahora - fechaCreacion;
  const limiteMs = 2 * 60 * 1000;
  return diferenciaMs <= limiteMs;
}

const Solicitud = () => {
  const [solicitudes, setSolicitudes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filterTipo, setFilterTipo] = useState('');
  const [dataSolicitud, setDataSolicitud] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupMode, setPopupMode] = useState('edit');
  const [popupArchivoUrl, setPopupArchivoUrl] = useState(null);
  const [popupDocumentoUrl, setPopupDocumentoUrl] = useState(null);

  const { user } = useContext(AuthContext);

  const fetchSolicitudes = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await getSolicitudes();
      if (!Array.isArray(result)) {
        setError(result.message || 'Error al obtener solicitudes');
        setSolicitudes([]);
      } else {
        const solicitudesFormateadas = result.map((solicitud) => ({
          ...solicitud,
          fechaCreacion: formatearFecha(solicitud.fechaCreacion),
          fechaActualizacion: formatearFecha(solicitud.fechaActualizacion),
          _rawFechaCreacion: solicitud.fechaCreacion,
          archivoUrl: solicitud.archivoRuta
            ? `${import.meta.env.VITE_BASE_URL.replace('/api', '')}/${solicitud.archivoRuta}`
            : null,
          documentoUrl: solicitud.documentoRuta
            ? `${import.meta.env.VITE_BASE_URL.replace('/api', '')}/${solicitud.documentoRuta}`
            : null,
        }));
        setSolicitudes(solicitudesFormateadas);
      }
    } catch (err) {
      setError('Error inesperado al obtener solicitudes');
      setSolicitudes([]);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSolicitudes();
  }, []);

  const handleTipoFilterChange = (e) => setFilterTipo(e.target.value);

  const handleSelectionChange = useCallback((seleccionadas) => {
    setDataSolicitud(seleccionadas);
  }, []);

  const handleClickUpdate = () => {
    if (dataSolicitud.length > 0) {
      const solicitud = dataSolicitud[0];
      if (!puedeEditarSolicitud(solicitud._rawFechaCreacion)) {
        setError('La solicitud ya no puede ser editada (tiempo límite: 2 minutos)');
        return;
      }
      setPopupMode('edit');
      setIsPopupOpen(true);
    }
  };

  const handleClickCreate = () => {
    setDataSolicitud([]);
    setPopupMode('create');
    setIsPopupOpen(true);
  };

  const handleUpdate = async (formData) => {
    try {
      const id = formData.get('id');
      if (!id) {
        setError('Falta el id de la solicitud para actualizar');
        return;
      }
      const result = await updateSolicitud(id, formData);
      if (result?.message) {
        setError(result.message);
      } else {
        await fetchSolicitudes();
        setIsPopupOpen(false);
        setDataSolicitud([]);
      }
    } catch (err) {
      setError('Error al actualizar la solicitud');
      console.error(err);
    }
  };

  const handleCreate = async (formData) => {
    try {
      const result = await createSolicitud(formData);
      if (result?.message) {
        setError(result.message);
      } else {
        await fetchSolicitudes();
        setIsPopupOpen(false);
        setDataSolicitud([]);
      }
    } catch (err) {
      setError('Error al crear la solicitud');
      console.error(err);
    }
  };

  const handleDelete = async (data) => {
    if (data.length === 0) return;
    try {
      const idToDelete = data[0].id;
      const result = await deleteSolicitud(idToDelete);
      if (result?.message) {
        setError(result.message);
      } else {
        await fetchSolicitudes();
        setDataSolicitud([]);
      }
    } catch (err) {
      setError('Error al eliminar la solicitud');
      console.error(err);
    }
  };

  const abrirPopupArchivo = (url) => setPopupArchivoUrl(url);
  const cerrarPopupArchivo = () => setPopupArchivoUrl(null);
  const abrirPopupDocumento = (url) => setPopupDocumentoUrl(url);
  const cerrarPopupDocumento = () => setPopupDocumentoUrl(null);

  const columns = [
    { title: 'ID', field: 'id', width: 50 },
    { title: 'Tipo', field: 'tipo', width: 250 },
    { title: 'Motivo', field: 'motivo', width: 250 },
    { title: 'Estado', field: 'estado', width: 150 },
    { title: 'Justificación', field: 'justificacionDeRechazo', width: 300 },
    { title: 'Fecha de creación', field: 'fechaCreacion', width: 200 },
    { title: 'Última actualización', field: 'fechaActualizacion', width: 200 },
  ];

  return (
    <div className="main-container">
      <div className="table-container">
        <div className="top-table">
          <h1 className="title-table">Solicitudes</h1>
          <div className="filter-actions">
            <Search
              value={filterTipo}
              onChange={handleTipoFilterChange}
              placeholder="Filtrar por tipo"
            />
            <button
              className="create-button"
              onClick={handleClickCreate}
              title="Solicitar documento"
            >
              Solicitar documento
            </button>
            <button
              onClick={handleClickUpdate}
              disabled={
                dataSolicitud.length === 0 ||
                !puedeEditarSolicitud(dataSolicitud[0]?._rawFechaCreacion)
              }
              title={
                dataSolicitud.length === 0
                  ? 'Selecciona una solicitud para editar'
                  : !puedeEditarSolicitud(dataSolicitud[0]?._rawFechaCreacion)
                  ? 'Tiempo expirado para editar (2 minutos)'
                  : 'Editar solicitud'
              }
            >
              <img
                src={
                  dataSolicitud.length === 0 ||
                  !puedeEditarSolicitud(dataSolicitud[0]?._rawFechaCreacion)
                    ? UpdateIconDisable
                    : UpdateIcon
                }
                alt="editar"
              />
            </button>
            <button
              className="delete-user-button"
              disabled={dataSolicitud.length === 0}
              onClick={() => handleDelete(dataSolicitud)}
              title={
                dataSolicitud.length === 0
                  ? 'Selecciona una solicitud para eliminar'
                  : 'Eliminar solicitud'
              }
            >
              <img
                src={dataSolicitud.length === 0 ? DeleteIconDisable : DeleteIcon}
                alt="eliminar"
              />
            </button>
            {dataSolicitud.length > 0 && dataSolicitud[0].archivoUrl && (
              <button
                className="create-button"
                onClick={() => abrirPopupArchivo(dataSolicitud[0].archivoUrl)}
                title="Ver archivo"
              >
                Ver imagen
              </button>
            )}
            {dataSolicitud.length > 0 &&
              dataSolicitud[0].estado === 'aprobado' &&
              dataSolicitud[0].documentoUrl && (
                <button
                  className="create-button"
                  onClick={() => abrirPopupDocumento(dataSolicitud[0].documentoUrl)}
                  title="Ver documento PDF"
                >
                  Ver documento
                </button>
              )}
          </div>
        </div>
        {loading && <p>Cargando solicitudes...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {!loading && !error && solicitudes.length === 0 && (
          <p>No hay solicitudes para mostrar.</p>
        )}
        <Table
          data={solicitudes}
          columns={columns}
          filter={filterTipo}
          dataToFilter="tipo"
          initialSortName="id"
          onSelectionChange={handleSelectionChange}
        />
      </div>
      <PopupSolicitud
        show={isPopupOpen}
        setShow={setIsPopupOpen}
        data={
          popupMode === 'edit' &&
          dataSolicitud.length > 0 &&
          dataSolicitud[0]?.id
            ? dataSolicitud[0]
            : {}
        }
        action={async (formData) => {
          if (!formData) return;
          if (popupMode === 'edit') {
            await handleUpdate(formData);
          } else {
            await handleCreate(formData);
          }
        }}
        mode={popupMode}
        usuarioId={user?.id}
      />
      <PopupArchivo url={popupArchivoUrl} onClose={cerrarPopupArchivo} />
      <PopupDocumento url={popupDocumentoUrl} onClose={cerrarPopupDocumento} />
    </div>
  );
};

export default Solicitud;
