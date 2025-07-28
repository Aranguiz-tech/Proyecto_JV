import { useState, useEffect } from 'react';

const useRegister = () => {
    const [errorEmail, setErrorEmail] = useState('');
    const [errorRut, setErrorRut] = useState('');
    const [errorRol, setErrorRol] = useState('');
    const [errorHogar, setErrorHogar] = useState('');
    const [inputData, setInputData] = useState({ email: '', rut: '', rol: '', id_hogar: '' });

    useEffect(() => {
        if (inputData.email) setErrorEmail('');
        if (inputData.rut) setErrorRut('');
        if (inputData.rol) setErrorRol('');
        if (inputData.id_hogar) setErrorHogar('');
    }, [inputData.email, inputData.rut, inputData.rol, inputData.id_hogar]);

    const errorData = (dataMessage) => {
        if (dataMessage.dataInfo === 'email') {
            setErrorEmail(dataMessage.message);
        } else if (dataMessage.dataInfo === 'rut') {
            setErrorRut(dataMessage.message);
        } else if (dataMessage.dataInfo === 'rol') {
            setErrorRol(dataMessage.message);
        } else if (dataMessage.dataInfo === 'id_hogar') {
            setErrorHogar(dataMessage.message);
        }
    };

    const handleInputChange = (field, value) => {
        setInputData(prevState => ({
            ...prevState,
            [field]: value
        }));
    };

    return {
        errorEmail,
        errorRut,
        errorRol,
        errorHogar,
        inputData,
        errorData,
        handleInputChange,
    };
};

export default useRegister;
