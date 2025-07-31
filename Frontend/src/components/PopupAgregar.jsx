import Form from './Form';
import '@styles/popup.css';
import CloseIcon from '@assets/XIcon.svg';
import useGetHogares from '@hooks/hogar/useGetHogares';
import { useEffect, useState } from 'react';

export default function PopupAgregar({ show, setShow, data, action }) {
    const userData = data && data.length > 0 ? data[0] : {};

    const { hogares } = useGetHogares();
    const [hogaresOptions, setHogaresOptions] = useState([]);

    useEffect(() => {
        const opciones = hogares.map((hogar) => ({
            value: hogar.id,
            label: hogar.direccion
        }));
        setHogaresOptions(opciones);
    }, [hogares]);

    const handleSubmit = (formData) => {
        action(formData);
    };

    const patternRut = new RegExp(/^(?:(?:[1-9]\d{0}|[1-2]\d{1})(\.\d{3}){2}|[1-9]\d{6}|[1-2]\d{7}|29\.999\.999|29999999)-[\dkK]$/);

    return (
        <div>
            { show && (
            <div className="bg">
                <div className="popup">
                    <button className='close' onClick={() => setShow(false)}>
                        <img src={CloseIcon} />
                    </button>
                    <Form
                        title="Agregar usuario"
                        fields={[
                            {
                                label: "Nombre",
                                name: "nombre",
                                defaultValue: userData.nombre|| "",
                                placeholder: 'Gabriel',
                                fieldType: 'input',
                                type: "text",
                                required: true,
                                maxLength: 50,
                                pattern: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
                                patternMessage: "Debe contener solo letras y espacios",
                            },
                            {
                                label: "Apellido",
                                name: "apellido",
                                defaultValue: userData.apellido || "",
                                placeholder: 'Aranguiz',
                                fieldType: 'input',
                                type: "text",
                                required: true,
                                maxLength: 50,
                                pattern: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
                                patternMessage: "Debe contener solo letras y espacios",
                            },
                            {
                                label: "Correo electrónico",
                                name: "email",
                                defaultValue: userData.email || "",
                                placeholder: 'example@gmail.com',
                                fieldType: 'input',
                                type: "email",
                                required: true,
                                maxLength: 35
                            },
                            {
                                label: "Rut",
                                name: "rut",
                                defaultValue: userData.rut || "",
                                placeholder: '21.308.770-3',
                                fieldType: 'input',
                                type: "text",
                                minLength: 9,
                                maxLength: 12,
                                pattern: patternRut,
                                patternMessage: "Debe ser xx.xxx.xxx-x o xxxxxxxx-x",
                                required: true,
                            },
                            {
                                label: "Rol",
                                name: "rol",
                                fieldType: 'select',
                                options: [
                                    { value: 'vecino', label: 'vecino' },
                                    { value: 'jefe de hogar', label: 'Jefe de hogar' },
                                ],
                                required: true,
                                defaultValue: userData.rol || "",
                            },
                            {
                                label: "Hogar",
                                name: "id_hogar",
                                fieldType: 'select',
                                options: hogaresOptions,
                                required: true,
                                defaultValue: userData.id_hogar || "",
                            },
                            {
                                label: "Contraseña",
                                name: "password",
                                placeholder: "**********",
                                fieldType: 'input',
                                type: "password",
                                required: true,
                                minLength: 8,
                                maxLength: 26,
                                pattern: /^[a-zA-Z0-9]+$/,
                                patternMessage: "Debe contener solo letras y números",
                            }
                        ]}
                        onSubmit={handleSubmit}
                        buttonText="Agregar usuario"
                        backgroundColor={'#fff'}
                    />
                </div>
            </div>
            )}
        </div>
    );
}
