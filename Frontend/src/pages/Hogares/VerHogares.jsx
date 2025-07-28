import useGetHogares from '@hooks/hogar/useGetHogares';
import useDeleteHogar from '@hooks/hogar/useDeleteHogar';
import useUpdateHogar from '@hooks/hogar/useUpdateHogar';
import Table from '@components/Table';
import PopupHogar from '@components/PopupHogar';
import Search from '@components/Search';
import DeleteIcon from '@assets/deleteIcon.svg';
import DeleteIconDisable from '@assets/deleteIconDisabled.svg';
import CancelIcon from '@assets/updateIcon.svg';
import CancelIconDisable from '@assets/updateIconDisabled.svg';
import { useState } from 'react';
import '@styles/users.css';

const Hogares = () => {
  const { hogares, fetchHogares } = useGetHogares();
  const [filterDireccion, setFilterDireccion] = useState('');
  const [dataHogar, setDataHogar] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const { handleDelete } = useDeleteHogar(fetchHogares, setDataHogar);
  const { handleUpdate } = useUpdateHogar(fetchHogares, setIsPopupOpen, setDataHogar);

const handleSelectionChange = (selected) => {
  setDataHogar(selected[0]); 
};


  const handleFilterChange = (e) => {
    setFilterDireccion(e.target.value);
  };

const handleClickActualizar = () => {
  if (dataHogar) setIsPopupOpen(true);
};


  const columns = [
    { title: "Dirección", field: "direccion", width: 1100 },
  ];

  return (
    <div className='main-container'>
      <div className='table-container'>
        <div className='top-table'>
          <h1 className='title-table'>Hogares</h1>
          <div className='filter-actions'>
            <Search value={filterDireccion} onChange={handleFilterChange} placeholder={'Filtrar por dirección'} />
            <button onClick={handleClickActualizar} disabled={!dataHogar}>
              <img src={!dataHogar ? CancelIconDisable : CancelIcon} alt="Actualizar" />
            </button>
            <button onClick={() => handleDelete(dataHogar)} disabled={!dataHogar}>
              <img src={!dataHogar ? DeleteIconDisable : DeleteIcon} alt="Eliminar" />
            </button>
          </div>
        </div>
        <Table
          data={hogares}
          columns={columns}
          filter={filterDireccion}
          dataToFilter={'direccion'}
          initialSortName={'direccion'}
          onSelectionChange={handleSelectionChange}
        />
      </div>

      <PopupHogar
        show={isPopupOpen}
        setShow={setIsPopupOpen}
        data={dataHogar}
        action={handleUpdate}
      />
    </div>
  );
};

export default Hogares;
