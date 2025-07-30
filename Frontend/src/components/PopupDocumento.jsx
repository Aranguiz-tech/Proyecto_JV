import React from 'react';
import '@styles/popup.css';
import CloseIcon from '@assets/XIcon.svg';

export default function PopupDocumento({ url, onClose }) {
  if (!url) return null;

  const handleDescargar = () => {
    const link = document.createElement('a');
    link.href = url;
    link.download = url.split('/').pop(); 
    link.target = '_blank';
    link.click();
  };

  const handleImprimir = () => {
    const printWindow = window.open(url, '_blank');
    printWindow.focus();
    printWindow.print();
  };

  return (
    <div className="bg">
      <div className="popup" style={{ width: '80%', height: '90%' }}>
        <button className="close" onClick={onClose}>
          <img src={CloseIcon} alt="cerrar" />
        </button>
        <h2>Documento aprobado</h2>

        <div style={{ flex: 1, overflow: 'auto' }}>
          <iframe
            src={url}
            title="Documento"
            width="100%"
            height="500px"
            style={{ border: '1px solid #ccc' }}
          ></iframe>
        </div>

        <div style={{ marginTop: '15px' }}>
          <button onClick={handleDescargar} style={{ marginRight: '10px' }}>
            Descargar
          </button>
          <button onClick={handleImprimir}>Imprimir</button>
        </div>
      </div>
    </div>
  );
}
