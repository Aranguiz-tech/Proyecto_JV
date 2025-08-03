import useGetHogares from '@hooks/hogar/useGetHogares';
import useDeleteHogar from '@hooks/hogar/useDeleteHogar';
import useUpdateHogar from '@hooks/hogar/useUpdateHogar';
import HogaresList from '@components/HogaresList';
import PopupEditarHogar from '@components/PopupEditarHogar';
import PopupAgregarHogar from '@components/PopupAgregarHogar';
import Search from '@components/Search';
import DeleteIcon from '@assets/deleteIcon.svg';
import DeleteIconDisable from '@assets/deleteIconDisabled.svg';
import CancelIcon from '@assets/updateIcon.svg';
import CancelIconDisable from '@assets/updateIconDisabled.svg';
import plus from '@assets/plus.svg';
import { createHogar } from '@services/hogar.service.js';
import { showErrorAlert, showSuccessAlert } from '@helpers/sweetAlert.js';
import { useState } from 'react';
import '@styles/users.css';

const Hogares = () => {
  const { hogares, fetchHogares } = useGetHogares();
  const [filterDireccion, setFilterDireccion] = useState('');
  const [dataHogar, setDataHogar] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isPopupAgregarOpen, setIsPopupAgregarOpen] = useState(false);

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

  const handleRegister = async (data) => {
    try {
      const response = await createHogar(data);

      if (response.status === 'Success') {
        showSuccessAlert('Hogar creado', 'El hogar fue registrado correctamente.');
        fetchHogares();
        setIsPopupAgregarOpen(false);
      } else {
        showErrorAlert('Error', response.message || 'No se pudo crear el hogar.');
      }
    } catch (error) {
      showErrorAlert('Error', 'No se pudo crear el hogar.');
    }
  };

  return (
    <div className='main-containers'>
      <div className='table-containers'>
        <div className='top-tables'>
          <h1 className='title-table-hogar'>Hogares</h1>
          <div className='filter-actions'>
            <Search value={filterDireccion} onChange={handleFilterChange} placeholder={'Filtrar por dirección'} />
            <button onClick={handleClickActualizar} disabled={!dataHogar}>
              <img src={!dataHogar ? CancelIconDisable : CancelIcon} alt="Actualizar" />
            </button>
            <button onClick={() => handleDelete(dataHogar)} disabled={!dataHogar}>
              <img src={!dataHogar ? DeleteIconDisable : DeleteIcon} alt="Eliminar" />
            </button>
            <button onClick={() => setIsPopupAgregarOpen(true)}>
              <img src={plus} alt="Agregar hogar" />
            </button>
          </div>
        </div>
<HogaresList
  data={hogares}
  filter={filterDireccion}
  onSelectionChange={handleSelectionChange}
/>

      </div>
      <PopupEditarHogar
        show={isPopupOpen}
        setShow={setIsPopupOpen}
        action={handleUpdate}
        data={dataHogar}
      />
      <PopupAgregarHogar
        show={isPopupAgregarOpen}
        setShow={setIsPopupAgregarOpen}
        action={handleRegister}
      />
    </div>
  );
};

export default Hogares;
