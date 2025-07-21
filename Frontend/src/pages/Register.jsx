import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { register } from '@services/auth.service.js';
import Form from "@components/Form";
import useRegister from '@hooks/auth/useRegister.jsx';
import { showErrorAlert, showSuccessAlert } from '@helpers/sweetAlert.js';
import useGetHogares from '@hooks/hogar/useGetHogares';
import '@styles/form.css';

const Register = () => {
	const navigate = useNavigate();
	const [hogaresOptions, setHogaresOptions] = useState([]);
	const {
		errorEmail,
		errorRut,
		errorRol,
		errorHogar,
		errorData,
		handleInputChange
	} = useRegister();

	const { hogares } = useGetHogares();

	useEffect(() => {
		if (Array.isArray(hogares)) {
			const opciones = hogares.map((hogar) => ({
				value: hogar.id,
				label: hogar.direccion
			}));
			setHogaresOptions(opciones);
		}
	}, [hogares]);

	const registerSubmit = async (data) => {
		try {
			const response = await register(data);
			if (response.status === 'Success') {
				showSuccessAlert('¡Registrado!', 'Usuario registrado exitosamente.');
				setTimeout(() => {
					navigate('/auth');
				}, 3000);
			} else if (response.status === 'Client error') {
				errorData(response.details);
			}
		} catch (error) {
			console.error("Error al registrar un usuario: ", error);
			showErrorAlert('Cancelado', 'Ocurrió un error al registrarse.');
		}
	};

	const patternRut = new RegExp(/^(?:(?:[1-9]\d{0}|[1-2]\d{1})(\.\d{3}){2}|[1-9]\d{6}|[1-2]\d{7}|29\.999\.999|29999999)-[\dkK]$/);

	return (
		<main className="container">
			<Form
				title="Crea tu cuenta"
				fields={[
					{
						label: "Nombre",
						name: "nombre",
						placeholder: "Gabriel",
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
						placeholder: "Aranguiz",
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
						placeholder: "example@gmail.cl",
						fieldType: 'input',
						type: "email",
						required: true,
						maxLength: 35,
						errorMessageData: errorEmail,
						validate: {
							emailDomain: (value) => value.endsWith('@gmail.cl') || 'El correo debe terminar en @gmail.cl'
						},
						onChange: (e) => handleInputChange('email', e.target.value)
					},
					{
						label: "Rut",
						name: "rut",
						placeholder: "23.770.330-1",
						fieldType: 'input',
						type: "text",
						minLength: 9,
						maxLength: 12,
						pattern: patternRut,
						patternMessage: "Debe ser xx.xxx.xxx-x o xxxxxxxx-x",
						required: true,
						errorMessageData: errorRut,
						onChange: (e) => handleInputChange('rut', e.target.value)
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
					},
					{
						label: "Rol",
						name: "rol",
						fieldType: 'select',
						options: [
							{ value: "vecino", label: "Vecino" },
							{ value: "jefe de hogar", label: "Jefe de hogar" },
						],
						required: true,
						errorMessageData: errorRol,
						onChange: (e) => handleInputChange('rol', e.target.value)
					},
					{
						label: "Hogar",
						name: "id_hogar",
						fieldType: 'select',
						options: hogaresOptions,
						required: true,
						errorMessageData: errorHogar,
						onChange: (e) => handleInputChange('id_hogar', e.target.value)
					}
				]}
				buttonText="Registrarse"
				onSubmit={registerSubmit}
				footerContent={
					<p>
						¿Ya tienes cuenta?, <a href="/auth">¡Inicia sesión aquí!</a>
					</p>
				}
			/>
		</main>
	);
};

export default Register;
