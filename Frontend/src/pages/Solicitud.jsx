import { useState, useEffect, useCallback, useContext } from 'react';

import Table from '@components/Table';
import Search from '@components/Search';
import PopupSolicitud from '@components/PopupSolicitud';

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

const Solicitud = () => {
  const [solicitudes, setSolicitudes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [filterTipo, setFilterTipo] = useState('');
  const [dataSolicitud, setDataSolicitud] = useState([]); // array de solicitudes seleccionadas
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupMode, setPopupMode] = useState('edit');

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
        setSolicitudes(result);
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
              disabled={dataSolicitud.length === 0}
              title={
                dataSolicitud.length === 0
                  ? 'Selecciona una solicitud para editar'
                  : 'Editar solicitud'
              }
            >
              <img
                src={dataSolicitud.length === 0 ? UpdateIconDisable : UpdateIcon}
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
    </div>
  );
};

export default Solicitud;
