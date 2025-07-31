import { useState } from 'react';
import '@styles/hogaresList.css';

export default function HogaresList({ data, filter, onSelectionChange }) {
  const [selectedId, setSelectedId] = useState(null);

  const handleClick = (hogar) => {
    setSelectedId(hogar.id);
    onSelectionChange([hogar]);
  };

  const hogaresFiltrados = data.filter((hogar) =>
    hogar.direccion.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="hogares-list">
      {hogaresFiltrados.map((hogar) => (
        <div
          key={hogar.id}
          className={`hogar-card ${selectedId === hogar.id ? 'selected' : ''}`}
          onClick={() => handleClick(hogar)}
        >
          <p className="direccion">{hogar.direccion}</p>
        </div>
      ))}
    </div>
  );
}
