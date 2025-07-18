import { useNavigate } from 'react-router-dom';
import '@styles/reuniones.css';

const Reuniones = () => {
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
            onClick={() => navigate('/reuniones/crear')}
          >
            Establecer próxima reunión
          </button>

          <button
            className="boton-verde-suave"
            onClick={() => navigate('/reuniones/ver')}
          >
            Ver reuniones
          </button>
        </div>
      </div>
    </>
  );
};

export default Reuniones;
