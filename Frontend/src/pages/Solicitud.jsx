import { useState, useEffect, useCallback } from 'react';

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

const Solicitud = () => {
  const [solicitudes, setSolicitudes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [filterTipo, setFilterTipo] = useState('');
  const [dataSolicitud, setDataSolicitud] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupMode, setPopupMode] = useState('edit');

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

  const handleUpdate = async (id, data) => {
    try {
      const result = await updateSolicitud(id, data);
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

  const handleCreate = async (data) => {
    try {
      const result = await createSolicitud(data);
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
              title={dataSolicitud.length === 0 ? 'Selecciona una solicitud para editar' : 'Editar solicitud'}
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
              title={dataSolicitud.length === 0 ? 'Selecciona una solicitud para eliminar' : 'Eliminar solicitud'}
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

        {!loading && !error && solicitudes.length === 0 && <p>No hay solicitudes para mostrar.</p>}

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
        data={dataSolicitud}
        action={async (formData) => {
          if (!formData) return;
          if (popupMode === 'edit') {
            await handleUpdate(formData.id, {
              tipo: formData.tipo,
              motivo: formData.motivo,
            });
          } else {
            await handleCreate({
              tipo: formData.tipo,
              motivo: formData.motivo,
            });
          }
        }}
        mode={popupMode}
      />
    </div>
  );
};

export default Solicitud;
