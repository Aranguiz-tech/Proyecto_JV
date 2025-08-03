import useGetHogares from '@hooks/hogar/useGetHogares';
import Search from '@components/Search';
import HogaresList from '@components/HogaresList';
import PopupVistaHogares from '@components/PopupVistaHogares';
import { useState } from 'react';
import '@styles/users.css';

const VistaHogares = () => {
  const { hogares } = useGetHogares();
  const [filterDireccion, setFilterDireccion] = useState('');
  const [selectedHogarId, setSelectedHogarId] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const handleFilterChange = (e) => {
    setFilterDireccion(e.target.value);
  };

  const handleSelection = (selected) => {
    if (selected[0]) {
      setSelectedHogarId(selected[0].id);
      setShowPopup(true);
    }
  };

  return (
    <div className='main-containers'>
      <div className='table-containers'>
        <div className='top-tables'>
          <h1 className='title-table-hogar'>Hogares</h1>
          <Search
            value={filterDireccion}
            onChange={handleFilterChange}
            placeholder={'Filtrar por dirección'}
          />
        </div>

        <HogaresList
          data={hogares}
          filter={filterDireccion}
          onSelectionChange={handleSelection}
        />
      </div>

      <PopupVistaHogares
        show={showPopup}
        setShow={setShowPopup}
        hogarId={selectedHogarId}
      />
    </div>
  );
};

export default VistaHogares;
