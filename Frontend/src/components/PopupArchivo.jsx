import React from 'react';

const PopupArchivo = ({ url, onClose }) => {
  if (!url) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0,0,0,0.7)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
      }}
      onClick={onClose}
    >
      <div
        style={{
          position: 'relative',
          backgroundColor: '#fff',
          padding: 10,
          borderRadius: 6,
          maxWidth: '90%',
          maxHeight: '90%',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: 5,
            right: 5,
            fontSize: 18,
            cursor: 'pointer',
            background: 'transparent',
            border: 'none',
          }}
          aria-label="Cerrar"
        >
          &times;
        </button>
        <img
          src={url}
          alt="Archivo"
          style={{ maxWidth: '100%', maxHeight: '80vh', display: 'block' }}
        />
      </div>
    </div>
  );
};

export default PopupArchivo;
