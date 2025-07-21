import { useNavigate } from 'react-router-dom';
import '@styles/hogares.css';

const Hogares = () => {
  const navigate = useNavigate();

  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          paddingTop: '15rem',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '10rem',
            flexWrap: 'wrap',
          }}
        >
          <button
            className="boton-verde-suave"
            onClick={() => navigate('/hogares/crear')}
          >
            Crear Hogar
          </button>

          <button
            className="boton-verde-suave"
            onClick={() => navigate('/hogares/ver')}
          >
            Ver hogares
          </button>
        </div>
      </div>
    </>
  );
};

export default Hogares;
