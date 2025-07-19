import useGetReuniones from '@hooks/reunion/useGetReuniones';
import useDeleteReunion from '@hooks/reunion/useDeleteReunion';
import useUpdateReunion from '@hooks/reunion/useUpdateReunion';
import Table from '@components/Table';
import PopupCancelarReunion from '@components/PopupReunion';
import Search from '@components/Search';
import DeleteIcon from '@assets/deleteIcon.svg';
import DeleteIconDisable from '@assets/deleteIconDisabled.svg';
import CancelIcon from '@assets/updateIcon.svg';
import CancelIconDisable from '@assets/updateIconDisabled.svg';
import { useState, useCallback } from 'react';
import '@styles/users.css';

const Reuniones = () => {
  const { reuniones, fetchReuniones } = useGetReuniones();
  const [filterFecha, setFilterFecha] = useState('');
  const [dataReunion, setDataReunion] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const { handleDelete } = useDeleteReunion(fetchReuniones, setDataReunion);
  const { handleUpdate } = useUpdateReunion(fetchReuniones, setIsPopupOpen, setDataReunion);

  const handleSelectionChange = useCallback((selectedReuniones) => {
    setDataReunion(selectedReuniones);
  }, []);

  const handleFechaFilterChange = (e) => {
    setFilterFecha(e.target.value);
  };

  const handleClickCancelar = () => {
    if (dataReunion.length > 0) setIsPopupOpen(true);
  };

  const columns = [
    { title: "Fecha", field: "fecha", width: 150 },
    { title: "Asunto", field: "asunto", width: 250 },
    { title: "Estado", field: "estado", width: 150 },
    { title: "Motivo de cancelación", field: "motivo", width: 300 },
  ];

  return (
    <div className='main-container'>
      <div className='table-container'>
        <div className='top-table'>
          <h1 className='title-table'>Reuniones</h1>
          <div className='filter-actions'>
            <Search value={filterFecha} onChange={handleFechaFilterChange} placeholder={'Filtrar por fecha'} />
            <button onClick={handleClickCancelar} disabled={dataReunion.length === 0}>
              <img src={dataReunion.length === 0 ? CancelIconDisable : CancelIcon} alt="cancelar" />
            </button>
            <button onClick={() => handleDelete(dataReunion)} disabled={dataReunion.length === 0}>
              <img src={dataReunion.length === 0 ? DeleteIconDisable : DeleteIcon} alt="eliminar" />
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
    </div>
  );
};

export default Reuniones;
