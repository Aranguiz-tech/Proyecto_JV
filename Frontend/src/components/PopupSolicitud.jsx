import React, { useState } from 'react';
import Form from './Form';
import '@styles/popupAdaptable.css';
import CloseIcon from '@assets/XIcon.svg';

const tiposDocumentos = [
  { value: "Certificado de Residencia", label: "Certificado de Residencia" },
];

const motivosSolicitud = [
  { value: "Para fines laborales", label: "Para fines laborales" },
  { value: "Para fines escolares", label: "Para fines escolares" },
  { value: "Para fines judiciales", label: "Para fines judiciales" },
  { value: "para fines gubernamentales", label: "para fines gubernamentales" },
  { value: "para consultar", label: "para consultar" },
];

export default function PopupSolicitud({ show, setShow, data, action, mode = 'edit', usuarioId }) {
  const solicitudData = data && typeof data === 'object' ? data : {};
  const [archivo, setArchivo] = useState(null);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setArchivo(e.target.files[0]);
    }
  };

  const handleSubmit = (formData) => {
    const dataToSend = new FormData();
    dataToSend.append('tipo', formData.tipo);
    dataToSend.append('motivo', formData.motivo);

    if (archivo) {
      dataToSend.append('archivo', archivo);
    }

    if (mode === 'edit' && solicitudData.id) {
      dataToSend.append('id', solicitudData.id);
    }

    if (usuarioId) {
      dataToSend.append('usuario', JSON.stringify({ id: usuarioId }));
    }

    action(dataToSend);
  };

  const fields = [
    {
      label: "Tipo",
      name: "tipo",
      defaultValue: solicitudData.tipo || "",
      fieldType: 'select',
      options: tiposDocumentos,
      required: true,
    },
    {
      label: "Motivo",
      name: "motivo",
      defaultValue: solicitudData.motivo || "",
      fieldType: 'select',
      options: motivosSolicitud,
      required: true,
    },
    {
      label: "Adjuntar archivo",
      name: "archivo",
      fieldType: "file",
      required: false,
      onChange: handleFileChange,
    },
  ];

  return (
    <div>
      {show && (
        <div className="bg">
          <div className="popup">
            <button className="close" onClick={() => setShow(false)}>
              <img src={CloseIcon} alt="cerrar" />
            </button>
            <Form
              title={mode === 'edit' ? "Editar solicitud" : "Crear solicitud"}
              fields={fields}
              onSubmit={handleSubmit}
              buttonText={mode === 'edit' ? "Guardar cambios" : "Crear solicitud"}
              backgroundColor={'#fff'}
              encType="multipart/form-data"
            />
          </div>
        </div>
      )}
    </div>
  );
}
