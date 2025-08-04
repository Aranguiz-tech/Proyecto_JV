import useGetReuniones from '@hooks/reunion/useGetReuniones';
import useDeleteReunion from '@hooks/reunion/useDeleteReunion';
import useUpdateReunion from '@hooks/reunion/useUpdateReunion';
import Table from '@components/Table';
import PopupCancelarReunion from '@components/PopupCancelarReunion';
import PopupAgregarReunion from '@components/PopupAgregarReunion';
import Search from '@components/Search';
import DeleteIcon from '@assets/deleteIcon.svg';
import DeleteIconDisable from '@assets/deleteIconDisabled.svg';
import CancelIcon from '@assets/updateIcon.svg';
import CancelIconDisable from '@assets/updateIconDisabled.svg';
import plus from '@assets/plus.svg';
import playicon from '@assets/playicon.svg';
import { useState } from 'react';
import { createReunion } from '@services/reunion.service.js';
import { showErrorAlert, showSuccessAlert } from '@helpers/sweetAlert.js';
import '@styles/users.css';

const Reuniones = () => {
  const { reuniones, fetchReuniones } = useGetReuniones();
  const [filterFecha, setFilterFecha] = useState('');
  const [dataReunion, setDataReunion] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isPopupAgregarOpen, setIsPopupAgregarOpen] = useState(false);

  const { handleDelete } = useDeleteReunion(fetchReuniones, setDataReunion);
  const { handleUpdate } = useUpdateReunion(fetchReuniones, setIsPopupOpen, setDataReunion);

  const handleSelectionChange = (selectedReuniones) => {
    setDataReunion(selectedReuniones);
  };

  const handleFechaFilterChange = (e) => {
    setFilterFecha(e.target.value);
  };

  const handleClickCancelar = () => {
    if (dataReunion.length > 0) setIsPopupOpen(true);
  };

  const handleRegister = async (data) => {
    const asuntoValido = data.asunto && data.asunto.trim().length > 0 && data.asunto.length <= 255;
    const lugarValido = data.lugar && data.lugar.trim().length > 0;
    const fechaHoy = new Date();
    const fechaIngresada = new Date(data.fechaInicio);
    const mismaFecha =
      fechaHoy.getFullYear() === fechaIngresada.getFullYear() &&
      fechaHoy.getMonth() === fechaIngresada.getMonth() &&
      fechaHoy.getDate() === fechaIngresada.getDate();
    const fechaValida = data.fechaInicio && (fechaIngresada > fechaHoy || mismaFecha);

    if (!asuntoValido) {
      showErrorAlert("Asunto inválido", "El asunto es obligatorio y no puede exceder los 255 caracteres.");
      return;
    }
    if (!lugarValido) {
      showErrorAlert("Lugar inválido", "Debes seleccionar un lugar válido.");
      return;
    }
    if (!fechaValida) {
      showErrorAlert("Fecha inválida", "No puedes agendar reuniones en fechas pasadas.");
      return;
    }

    try {
      const response = await createReunion(data);

      if (response.status === 'Success') {
        showSuccessAlert('¡Reunión creada!', 'Reunión registrada correctamente.');
        fetchReuniones();
        setIsPopupAgregarOpen(false);
      } else if (response.status === 'Client error') {
        if (response.details === 'Ya existe una reunión programada para esta fecha') {
          showErrorAlert('Fecha duplicada', 'Ya hay una reunión programada para ese día.');
        } else if (response.details === 'La fecha de inicio no puede ser anterior a hoy') {
          showErrorAlert('Fecha inválida', 'No puedes agendar reuniones en fechas pasadas.');
        } else {
          showErrorAlert('Error', response.details);
        }
      } else {
        showErrorAlert("Error", "Error desconocido al crear reunión.");
      }
    } catch (error) {
      showErrorAlert("Error", "No se pudo registrar la reunión.");
    }
  };

  const algunaEsRealizada = dataReunion.some(r => r.estado === 'realizada');
  const todasSonProgramadas = dataReunion.every(r => r.estado === 'programada');

  const esHoy = (fecha) => {
    const hoy = new Date();
    const fechaReunion = new Date(fecha);
    return (
      hoy.getFullYear() === fechaReunion.getFullYear() &&
      hoy.getMonth() === fechaReunion.getMonth() &&
      hoy.getDate() === fechaReunion.getDate()
    );
  };

  const columns = [
    { title: "Fecha", field: "fecha", width: 150 },
    {
      title: "Asunto",
      field: "asunto",
      width: 250,
      formatter: (cell) => {
        const valor = cell.getValue();
        return `<span title="${valor}">${valor}</span>`;
      }
    },
    { title: "Lugar", field: "lugar", width: 250 },
    {
      title: "Estado",
      field: "estado",
      width: 150,
      formatter: function (cell) {
        const estado = cell.getValue();
        const clase = estado === 'programada'
          ? 'estado-programada'
          : estado === 'realizada'
            ? 'estado-realizada'
            : 'estado-default';
        return `<span class="${clase}">${estado}</span>`;
      }
    },
    { title: "Motivo de cancelación", field: "motivo", width: 300 },
  ];

  return (
    <div className='main-container'>
      <div className='table-container'>
        <div className='top-table'>
          <h1 className='title-table'>Reuniones</h1>
          <div className='filter-actions'>
            <Search value={filterFecha} onChange={handleFechaFilterChange} placeholder={'Filtrar por fecha'} />
            <button
              onClick={handleClickCancelar}
              disabled={dataReunion.length === 0 || !todasSonProgramadas}
            >
              <img
                src={dataReunion.length === 0 || !todasSonProgramadas ? CancelIconDisable : CancelIcon}
                alt="cancelar"
              />
            </button>
            <button
              className='delete-user-button'
              onClick={() => handleDelete(dataReunion)}
              disabled={dataReunion.length === 0 || algunaEsRealizada}
            >
              <img
                src={dataReunion.length === 0 || algunaEsRealizada ? DeleteIconDisable : DeleteIcon}
                alt="eliminar"
              />
            </button>
            <button
              className='delete-user-button'
              onClick={() => {
                if (
                  dataReunion.length === 1 &&
                  dataReunion[0].estado === 'programada' &&
                  esHoy(dataReunion[0].fechaInicio)
                ) {
                  window.location.href = `/asistencia/${dataReunion[0].id}`;
                }
              }}
              disabled={
                dataReunion.length !== 1 ||
                dataReunion[0].estado !== 'programada' ||
                !esHoy(dataReunion[0].fechaInicio)
              }
              title={
                dataReunion.length === 1 &&
                dataReunion[0].estado === 'programada' &&
                !esHoy(dataReunion[0].fechaInicio)
                  ? "No puedes iniciar la reunión si no es el día programado"
                  : ""
              }
            >
              <img src={playicon} alt="iniciar" className="icono-reunion" />
            </button>
            <button className='delete-user-button' onClick={() => setIsPopupAgregarOpen(true)}>
              <img src={plus} alt="add-reunion" />
            </button>
          </div>
        </div>
        <Table
          data={reuniones}
          columns={columns}
          filter={filterFecha}
          dataToFilter={'fecha'}
          initialSortName={'fecha'}
          onSelectionChange={handleSelectionChange}
        />
      </div>
      <PopupCancelarReunion
        show={isPopupOpen}
        setShow={setIsPopupOpen}
        data={dataReunion}
        action={handleUpdate}
      />
      <PopupAgregarReunion
        show={isPopupAgregarOpen}
        setShow={setIsPopupAgregarOpen}
        action={handleRegister}
      />
    </div>
  );
};

export default Reuniones;
