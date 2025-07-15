import useCreateReunion from '@hooks/reunion/useCreateReunion';
import { useState } from 'react';

const Reuniones = () => {
  const { fetchCreateReunion, reunion } = useCreateReunion();

  const [asunto, setAsunto] = useState('');
  const [fechaInicio, setFechaInicio] = useState('');

  const handleSubmit = () => {
    fetchCreateReunion({
      asunto,
      fechaInicio
    });
  };

  return (
    <div>
      <h2>Crear reunión</h2>
      <input
        type="text"
        placeholder="Asunto"
        value={asunto}
        onChange={(e) => setAsunto(e.target.value)}
      />
      <input
        type="date"
        value={fechaInicio}
        onChange={(e) => setFechaInicio(e.target.value)}
      />
      <button onClick={handleSubmit}>Crear reunión</button>

      {reunion && (
        <p>✅ Reunión creada: {reunion.asunto} ({reunion.fechaInicio})</p>
      )}
    </div>
  );
};

export default Reuniones;
