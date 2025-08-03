import axios from 'axios';

const authAxios = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL, 
});

authAxios.interceptors.request.use(
  (config) => {
    const usuario = JSON.parse(sessionStorage.getItem('usuario'));
    const token = usuario?.token;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default authAxios;
